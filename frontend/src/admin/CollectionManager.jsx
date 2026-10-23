import { useCallback, useEffect, useMemo, useState } from 'react'
import { Field, emptyValue } from './fields'
import { schemas } from './schemas'
import { AdminButton, Badge, ConfirmDialog, Notice, PageHeader, Spinner } from './ui'
import { deleteItem, listAll, saveItem, updateItem } from '../services/content'
import { Close, Plus } from '../components/Icons'

function blank(fields) {
  return Object.fromEntries(fields.filter((f) => f.name).map((f) => [f.name, emptyValue(f)]))
}

function Editor({ schema, collection, item, items, onClose, onSaved }) {
  const isNew = !item.id
  const [values, setValues] = useState(() => ({ ...blank(schema.fields), ...item }))
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [failure, setFailure] = useState('')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && !saving && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, saving])

  function validate() {
    const e = {}
    for (const f of schema.fields) {
      if (!f.name || !f.required) continue
      const v = values[f.name]
      if (v === '' || v == null || (Array.isArray(v) && !v.length)) e[f.name] = `${f.label} is required.`
    }
    if (values.slug && items.some((i) => i.slug === values.slug && i.id !== item.id)) {
      e.slug = 'Another item already uses this slug.'
    }
    setErrors(e)
    return !Object.keys(e).length
  }

  async function save(e) {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    setFailure('')
    try {
      let data = { ...values }
      // Tidy list fields typed into textareas.
      for (const f of schema.fields) {
        if (f.type === 'list' && Array.isArray(data[f.name])) data[f.name] = data[f.name].map((s) => s.trim()).filter(Boolean)
        if (f.type === 'images' && Array.isArray(data[f.name])) data[f.name] = data[f.name].filter(Boolean)
      }
      if (schema.beforeSave) data = schema.beforeSave(data)
      await saveItem(collection, item.id, data)
      onSaved(isNew ? `${schema.singular[0].toUpperCase()}${schema.singular.slice(1)} created.` : 'Changes saved.')
    } catch (err) {
      setFailure(err.code === 'permission-denied' ? 'Saving was blocked by security rules. Check that this account is listed in the admins collection.' : err.message)
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onMouseDown={(e) => e.target === e.currentTarget && !saving && onClose()}>
      <form onSubmit={save} className="flex h-full w-full max-w-3xl flex-col bg-white shadow-2xl" noValidate>
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-lg font-semibold">
            {isNew ? `New ${schema.singular}` : `Edit ${schema.singular}`}
          </h2>
          <button type="button" onClick={onClose} aria-label="Close editor" className="grid size-9 place-items-center rounded-md hover:bg-mist">
            <Close />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid gap-5 md:grid-cols-2">
            {schema.fields.map((f, i) => (
              <Field
                key={f.name || `s${i}`}
                field={f}
                value={f.name ? values[f.name] : undefined}
                values={values}
                folder={collection}
                error={errors[f.name]}
                onChange={(v) => {
                  setValues((s) => ({ ...s, [f.name]: v }))
                  if (errors[f.name]) setErrors((x) => ({ ...x, [f.name]: undefined }))
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-line px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            {failure && <span className="text-red-600">{failure}</span>}
            {!failure && Object.keys(errors).some((k) => errors[k]) && <span className="text-red-600">Fix the highlighted fields to save.</span>}
          </div>
          <div className="flex gap-2">
            <AdminButton type="button" variant="ghost" onClick={onClose} disabled={saving}>
              Cancel
            </AdminButton>
            <AdminButton type="submit" disabled={saving}>
              {saving ? 'Saving…' : isNew ? `Create ${schema.singular}` : 'Save changes'}
            </AdminButton>
          </div>
        </div>
      </form>
    </div>
  )
}

/** List + editor for one Firestore collection, driven by its schema. */
export default function CollectionManager({ collection }) {
  const schema = schemas[collection]
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [flash, setFlash] = useState('')
  const [editing, setEditing] = useState(null)
  const [removing, setRemoving] = useState(null)
  const [busy, setBusy] = useState(false)
  const [q, setQ] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await listAll(collection, ...schema.sort))
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [collection, schema.sort])

  useEffect(() => {
    load()
    setEditing(null)
    setQ('')
  }, [load])

  useEffect(() => {
    if (!flash) return
    const t = setTimeout(() => setFlash(''), 3500)
    return () => clearTimeout(t)
  }, [flash])

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? items.filter((i) => String(i[schema.titleField] || '').toLowerCase().includes(t)) : items
  }, [items, q, schema.titleField])

  async function togglePublished(item) {
    await updateItem(collection, item.id, { published: !item.published })
    setItems((list) => list.map((i) => (i.id === item.id ? { ...i, published: !i.published } : i)))
  }

  async function confirmDelete() {
    setBusy(true)
    try {
      await deleteItem(collection, removing.id)
      setItems((list) => list.filter((i) => i.id !== removing.id))
      setFlash('Deleted.')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
      setRemoving(null)
    }
  }

  return (
    <>
      <PageHeader title={schema.title} description={`${items.length} ${items.length === 1 ? schema.singular : `${schema.singular}s`}`}>
        <AdminButton onClick={() => setEditing({})}>
          <Plus className="size-4" /> New {schema.singular}
        </AdminButton>
      </PageHeader>

      <div className="space-y-4">
        {flash && <Notice tone="success">{flash}</Notice>}
        {error && <Notice tone="error">{error}</Notice>}

        <input type="search" placeholder={`Search ${schema.title.toLowerCase()}`} value={q} onChange={(e) => setQ(e.target.value)} className="field-input max-w-sm" />

        <div className="overflow-hidden rounded-lg border border-line bg-white">
          {loading ? (
            <div className="grid place-items-center p-12">
              <Spinner />
            </div>
          ) : shown.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-semibold">{items.length ? 'Nothing matches your search.' : `No ${schema.singular}s yet.`}</p>
              {!items.length && (
                <p className="mt-1 text-sm text-graphite">
                  Create your first {schema.singular}, or import the current website content from the Dashboard.
                </p>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {shown.map((item) => (
                <li key={item.id} className="flex items-center gap-4 px-4 py-3 sm:px-5">
                  {schema.thumb && (
                    <div className="size-12 shrink-0 overflow-hidden rounded-md bg-mist">
                      {item[schema.thumb] && <img src={item[schema.thumb]} alt="" className="size-full object-cover" loading="lazy" />}
                    </div>
                  )}
                  <button type="button" onClick={() => setEditing(item)} className="min-w-0 flex-1 text-left">
                    <p className="truncate font-semibold hover:text-violet">{item[schema.titleField] || 'Untitled'}</p>
                    <p className="truncate text-sm text-graphite">{schema.subtitle?.(item)}</p>
                  </button>
                  <button type="button" onClick={() => togglePublished(item)} title="Toggle visibility on the website">
                    {item.published ? <Badge tone="green">Published</Badge> : <Badge>Draft</Badge>}
                  </button>
                  <div className="flex gap-1">
                    <AdminButton variant="ghost" className="hidden h-9 sm:inline-flex" onClick={() => setEditing(item)}>
                      Edit
                    </AdminButton>
                    <AdminButton variant="ghost" className="h-9 px-3 text-red-600" onClick={() => setRemoving(item)}>
                      Delete
                    </AdminButton>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {editing && (
        <Editor
          schema={schema}
          collection={collection}
          item={editing}
          items={items}
          onClose={() => setEditing(null)}
          onSaved={(msg) => {
            setEditing(null)
            setFlash(msg)
            load()
          }}
        />
      )}

      <ConfirmDialog
        open={Boolean(removing)}
        title={`Delete this ${schema.singular}?`}
        body={removing ? `“${removing[schema.titleField] || 'Untitled'}” will be removed from the website. This can’t be undone.` : ''}
        busy={busy}
        onCancel={() => setRemoving(null)}
        onConfirm={confirmDelete}
      />
    </>
  )
}
