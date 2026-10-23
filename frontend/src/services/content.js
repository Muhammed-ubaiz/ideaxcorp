import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCount,
  getDoc,
  getDocs,
  limit as limitTo,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore/lite'
import { db, isFirebaseConfigured } from '../firebase/firebase'
import * as defaults from '../data/site'

/** Public content collections, with how each one is sorted on the site. */
export const COLLECTIONS = {
  services: { sort: 'order', dir: 'asc' },
  portfolio: { sort: 'order', dir: 'asc' },
  blogs: { sort: 'publishedAt', dir: 'desc' },
  testimonials: { sort: 'order', dir: 'asc' },
  faqs: { sort: 'order', dir: 'asc' },
  team: { sort: 'order', dir: 'asc' },
}

const loadBlogDefaults = () => import('../data/blogs.json').then((m) => m.default)

export async function getDefaults(name) {
  if (name === 'blogs') return loadBlogDefaults()
  return defaults[name] ?? []
}

export const defaultSettings = { ...defaults.settings, privacyPolicy: defaults.privacyPolicy }

const withId = (snap) => ({ id: snap.id, ...snap.data() })

// ---- Public reads (cached for the session) -------------------------------------------

const cache = new Map()

function sortItems(items, { sort, dir }) {
  return [...items].sort((a, b) => {
    const x = a[sort] ?? ''
    const y = b[sort] ?? ''
    const r = x < y ? -1 : x > y ? 1 : 0
    return dir === 'desc' ? -r : r
  })
}

async function fetchPublishedUncached(name) {
  const cfg = COLLECTIONS[name]
  if (isFirebaseConfigured) {
    try {
      // Security rules only allow public reads of published documents, so the query must say so.
      const snap = await getDocs(query(collection(db, name), where('published', '==', true)))
      if (!snap.empty) return sortItems(snap.docs.map(withId), cfg)
    } catch (err) {
      console.warn(`[content] Falling back to bundled "${name}":`, err.code || err.message)
    }
  }
  const items = await getDefaults(name)
  return sortItems(
    items.filter((i) => i.published !== false).map((i, n) => ({ id: i.slug || i.id || `${name}-${n}`, ...i })),
    cfg,
  )
}

export function fetchPublished(name) {
  if (!cache.has(name)) {
    cache.set(
      name,
      fetchPublishedUncached(name).catch((err) => {
        cache.delete(name)
        throw err
      }),
    )
  }
  return cache.get(name)
}

let settingsPromise
export function fetchSettings() {
  if (!settingsPromise) {
    settingsPromise = (async () => {
      if (!isFirebaseConfigured) return defaultSettings
      try {
        const snap = await getDoc(doc(db, 'settings', 'site'))
        if (!snap.exists()) return defaultSettings
        const data = snap.data()
        // Ignore blank values so a half-filled settings form never wipes real content.
        const filled = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== '' && v != null))
        return { ...defaultSettings, ...filled, socials: { ...defaultSettings.socials, ...(data.socials || {}) } }
      } catch (err) {
        console.warn('[content] Falling back to bundled settings:', err.code || err.message)
        return defaultSettings
      }
    })()
  }
  return settingsPromise
}

export function clearContentCache() {
  cache.clear()
  settingsPromise = undefined
}

// ---- Contact messages ------------------------------------------------------------------

export async function submitMessage(data) {
  if (!isFirebaseConfigured) {
    throw new Error('Online messaging is not set up yet.')
  }
  await addDoc(collection(db, 'messages'), {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    subject: data.subject,
    message: data.message.trim(),
    read: false,
    createdAt: serverTimestamp(),
  })
}

// ---- Admin CRUD ------------------------------------------------------------------------

export async function listAll(name, sortField = 'order', dir = 'asc') {
  const snap = await getDocs(collection(db, name))
  return sortItems(snap.docs.map(withId), { sort: sortField, dir })
}

export async function saveItem(name, id, data) {
  const payload = { ...data, updatedAt: serverTimestamp() }
  delete payload.id
  if (id) {
    await setDoc(doc(db, name, id), payload, { merge: true })
    clearContentCache()
    return id
  }
  const ref = await addDoc(collection(db, name), { ...payload, createdAt: serverTimestamp() })
  clearContentCache()
  return ref.id
}

export async function updateItem(name, id, data) {
  await updateDoc(doc(db, name, id), data)
  clearContentCache()
}

export async function deleteItem(name, id) {
  await deleteDoc(doc(db, name, id))
  clearContentCache()
}

export async function getSettingsDoc() {
  const snap = await getDoc(doc(db, 'settings', 'site'))
  return snap.exists() ? snap.data() : null
}

export async function saveSettings(data) {
  await setDoc(doc(db, 'settings', 'site'), { ...data, updatedAt: serverTimestamp() }, { merge: true })
  clearContentCache()
}

export async function countDocs(name, constraints = []) {
  const snap = await getCount(query(collection(db, name), ...constraints))
  return snap.data().count
}

export async function recentMessages(n = 5) {
  const snap = await getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limitTo(n)))
  return snap.docs.map(withId)
}

/**
 * Copies the bundled website content into Firestore. Only collections that are currently
 * empty are written, so running it twice never duplicates or overwrites edits.
 */
export async function importDefaultContent() {
  const report = []
  for (const name of Object.keys(COLLECTIONS)) {
    const existing = await getCount(collection(db, name))
    if (existing.data().count > 0) {
      report.push(`${name}: skipped (already has ${existing.data().count})`)
      continue
    }
    const items = await getDefaults(name)
    // Firestore batches cap at 500 writes; blog bodies are large, so commit in small groups.
    for (let i = 0; i < items.length; i += 10) {
      const batch = writeBatch(db)
      for (const item of items.slice(i, i + 10)) {
        const ref = item.slug ? doc(db, name, item.slug) : doc(collection(db, name))
        const data = { ...item, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }
        delete data.id
        batch.set(ref, data)
      }
      await batch.commit()
    }
    report.push(`${name}: imported ${items.length}`)
  }
  const settingsSnap = await getDoc(doc(db, 'settings', 'site'))
  if (!settingsSnap.exists()) {
    await setDoc(doc(db, 'settings', 'site'), { ...defaultSettings, updatedAt: serverTimestamp() })
    report.push('settings: imported')
  } else {
    report.push('settings: skipped (already set)')
  }
  clearContentCache()
  return report
}
