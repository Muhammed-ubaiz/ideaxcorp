import { useId, useMemo, useRef, useState } from 'react'
import { uploadFile, MAX_UPLOAD_MB } from '../services/storage'
import { sanitizeHtml } from '../utils/sanitize'
import { slugify } from '../utils/format'
import { Close, Plus } from '../components/Icons'

/* Dot-path helpers so settings can address nested values like "socials.instagram". */
export const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
export function setPath(obj, path, value) {
  const keys = path.split('.')
  const out = { ...obj }
  let cur = out
  keys.slice(0, -1).forEach((k) => {
    cur[k] = { ...(cur[k] || {}) }
    cur = cur[k]
  })
  cur[keys.at(-1)] = value
  return out
}

/** Default value for each field type, used when creating a new item. */
export function emptyValue(field) {
  if (field.default !== undefined) return typeof field.default === 'function' ? field.default() : field.default
  switch (field.type) {
    case 'list':
    case 'images':
    case 'objects':
    case 'pairs':
      return []
    case 'toggle':
      return false
    case 'number':
      return 0
    default:
      return ''
  }
}

function Label({ field, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {field.label}
      {field.required && <span className="text-violet"> *</span>}
    </label>
  )
}

function Help({ children }) {
  return children ? <p className="mt-1.5 text-xs text-graphite">{children}</p> : null
}

/* ---------------------------------------------------------------- Image */

export function ImageInput({ value, onChange, folder = 'misc', compact = false }) {
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')
  const input = useRef(null)

  async function onFile(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    setProgress(0)
    try {
      onChange(await uploadFile(file, folder, setProgress))
    } catch (err) {
      setError(err.message || 'Upload failed.')
    } finally {
      setProgress(null)
    }
  }

  return (
    <div className={`flex gap-4 ${compact ? 'items-center' : 'items-start'}`}>
      <div className={`grid shrink-0 place-items-center overflow-hidden rounded-md border border-line bg-mist ${compact ? 'size-14' : 'size-24'}`}>
        {value ? <img src={value} alt="" className="size-full object-cover" /> : <span className="text-xs text-smoke">No image</span>}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <input type="url" className="field-input" placeholder="https://… or /images/…" value={value || ''} onChange={(e) => onChange(e.target.value)} />
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <button type="button" onClick={() => input.current?.click()} className="font-semibold text-violet hover:underline" disabled={progress !== null}>
            {progress !== null ? `Uploading… ${progress}%` : 'Upload file'}
          </button>
          {value && (
            <button type="button" onClick={() => onChange('')} className="text-graphite hover:text-red-600">
              Remove
            </button>
          )}
          <span className="text-xs text-smoke">Images up to {MAX_UPLOAD_MB} MB</span>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <input ref={input} type="file" accept="image/*" className="hidden" onChange={onFile} />
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- HTML editor */

const SNIPPETS = [
  ['H2', '<h2>', '</h2>'],
  ['H3', '<h3>', '</h3>'],
  ['Bold', '<strong>', '</strong>'],
  ['Italic', '<em>', '</em>'],
  ['Link', '<a href="https://">', '</a>'],
  ['List', '<ul>\n  <li>', '</li>\n</ul>'],
  ['Quote', '<blockquote>', '</blockquote>'],
  ['Paragraph', '<p>', '</p>'],
]

function HtmlEditor({ id, value, onChange, folder }) {
  const [tab, setTab] = useState('write')
  const area = useRef(null)
  const file = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const preview = useMemo(() => (tab === 'preview' ? sanitizeHtml(value) : ''), [tab, value])

  function wrap(before, after) {
    const el = area.current
    const { selectionStart: s, selectionEnd: e } = el
    const next = value.slice(0, s) + before + value.slice(s, e) + after + value.slice(e)
    onChange(next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(s + before.length, e + before.length)
    })
  }

  async function insertImage(e) {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    setUploading(true)
    setUploadError('')
    try {
      const url = await uploadFile(f, folder)
      wrap(`<figure><img src="${url}" alt="">`, '<figcaption></figcaption></figure>')
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-md border border-line">
      <div className="flex flex-wrap items-center gap-1 border-b border-line bg-mist px-2 py-1.5">
        {['write', 'preview'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded px-3 py-1 text-sm font-semibold capitalize ${tab === t ? 'bg-white text-ink shadow-sm' : 'text-graphite'}`}
          >
            {t}
          </button>
        ))}
        {tab === 'write' && (
          <>
            <span className="mx-1 h-5 w-px bg-line" />
            {SNIPPETS.map(([label, b, a]) => (
              <button key={label} type="button" onClick={() => wrap(b, a)} className="rounded px-2 py-1 text-xs font-medium text-graphite hover:bg-white hover:text-ink">
                {label}
              </button>
            ))}
            <button type="button" onClick={() => file.current?.click()} className="rounded px-2 py-1 text-xs font-medium text-violet hover:bg-white" disabled={uploading}>
              {uploading ? 'Uploading…' : 'Image'}
            </button>
            <input ref={file} type="file" accept="image/*" className="hidden" onChange={insertImage} />
          </>
        )}
      </div>
      {uploadError && <p className="border-b border-line bg-red-50 px-4 py-2 text-sm text-red-700">{uploadError}</p>}
      {tab === 'write' ? (
        <textarea
          id={id}
          ref={area}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={22}
          spellCheck
          className="block w-full resize-y bg-white p-4 font-mono text-[0.85rem] leading-relaxed outline-none"
        />
      ) : (
        <div className="prose-ix max-h-[38rem] overflow-y-auto bg-white p-6" dangerouslySetInnerHTML={{ __html: preview }} />
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- Repeatable groups */

function ObjectList({ field, value = [], onChange, folder }) {
  const sub = field.type === 'pairs' ? [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
  ] : field.fields
  const update = (i, k, v) => onChange(value.map((row, n) => (n === i ? { ...row, [k]: v } : row)))
  const move = (i, d) => {
    const next = [...value]
    ;[next[i], next[i + d]] = [next[i + d], next[i]]
    onChange(next)
  }
  return (
    <div className="space-y-3">
      {value.map((row, i) => (
        <div key={i} className="rounded-md border border-line bg-mist/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-graphite">
              {field.itemLabel || 'Item'} {i + 1}
            </span>
            <div className="flex items-center gap-1 text-xs">
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="rounded px-2 py-1 hover:bg-white disabled:opacity-30">
                Up
              </button>
              <button type="button" disabled={i === value.length - 1} onClick={() => move(i, 1)} className="rounded px-2 py-1 hover:bg-white disabled:opacity-30">
                Down
              </button>
              <button type="button" onClick={() => onChange(value.filter((_, n) => n !== i))} className="rounded px-2 py-1 text-red-600 hover:bg-white">
                Remove
              </button>
            </div>
          </div>
          <div className="grid gap-3">
            {sub.map((sf) =>
              sf.type === 'textarea' ? (
                <textarea key={sf.name} aria-label={sf.label} placeholder={sf.label} rows={sf.rows || 3} className="field-input" value={row[sf.name] || ''} onChange={(e) => update(i, sf.name, e.target.value)} />
              ) : sf.type === 'image' ? (
                <ImageInput key={sf.name} compact folder={folder} value={row[sf.name]} onChange={(v) => update(i, sf.name, v)} />
              ) : (
                <input key={sf.name} aria-label={sf.label} placeholder={sf.label} className="field-input" value={row[sf.name] || ''} onChange={(e) => update(i, sf.name, e.target.value)} />
              ),
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, Object.fromEntries(sub.map((s) => [s.name, '']))])}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:underline"
      >
        <Plus className="size-4" /> Add {(field.itemLabel || 'item').toLowerCase()}
      </button>
    </div>
  )
}

function ImageList({ value = [], onChange, folder }) {
  return (
    <div className="space-y-3">
      {value.map((src, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex-1">
            <ImageInput compact folder={folder} value={src} onChange={(v) => onChange(value.map((x, n) => (n === i ? v : x)))} />
          </div>
          <button type="button" aria-label="Remove image" onClick={() => onChange(value.filter((_, n) => n !== i))} className="grid size-9 place-items-center rounded text-graphite hover:bg-mist hover:text-red-600">
            <Close className="size-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, ''])} className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:underline">
        <Plus className="size-4" /> Add image
      </button>
    </div>
  )
}

/* ---------------------------------------------------------------- Dispatcher */

export function Field({ field, value, onChange, values, folder, error }) {
  const id = useId()
  if (field.type === 'section') {
    return (
      <div className="border-t border-line pt-6 first:border-0 first:pt-0 md:col-span-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">{field.label}</h3>
        {field.help && <p className="mt-1 text-sm text-graphite">{field.help}</p>}
      </div>
    )
  }

  const wide = ['textarea', 'html', 'list', 'pairs', 'objects', 'images', 'image'].includes(field.type) || field.wide
  let control
  switch (field.type) {
    case 'textarea':
      control = <textarea id={id} rows={field.rows || 4} className="field-input" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      break
    case 'html':
      control = <HtmlEditor id={id} value={value || ''} onChange={onChange} folder={folder} />
      break
    case 'number':
      control = <input id={id} type="number" className="field-input" value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />
      break
    case 'date':
      control = <input id={id} type="date" className="field-input" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      break
    case 'toggle':
      control = (
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          onClick={() => onChange(!value)}
          className={`relative h-7 w-12 rounded-full transition-colors ${value ? 'bg-violet' : 'bg-line'}`}
        >
          <span className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-5' : ''}`} />
        </button>
      )
      break
    case 'select':
      control = (
        <select id={id} className="field-input" value={value || ''} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )
      break
    case 'list':
      control = (
        <textarea
          id={id}
          rows={field.rows || 5}
          className="field-input"
          value={(value || []).join('\n')}
          onChange={(e) => onChange(e.target.value.split('\n'))}
          onBlur={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
        />
      )
      break
    case 'image':
      control = <ImageInput value={value} onChange={onChange} folder={folder} />
      break
    case 'images':
      control = <ImageList value={value} onChange={onChange} folder={folder} />
      break
    case 'pairs':
    case 'objects':
      control = <ObjectList field={field} value={value} onChange={onChange} folder={folder} />
      break
    case 'slug':
      control = (
        <div className="flex gap-2">
          <input id={id} className="field-input font-mono text-sm" value={value || ''} onChange={(e) => onChange(slugify(e.target.value))} />
          <button type="button" onClick={() => onChange(slugify(values[field.from] || ''))} className="shrink-0 rounded-md border border-line px-3 text-sm font-medium hover:bg-mist">
            From title
          </button>
        </div>
      )
      break
    default:
      control = (
        <>
          <input id={id} type={field.inputType || 'text'} className="field-input" value={value || ''} list={field.suggestions ? `${id}-s` : undefined} onChange={(e) => onChange(e.target.value)} />
          {field.suggestions && (
            <datalist id={`${id}-s`}>
              {field.suggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          )}
        </>
      )
  }

  return (
    <div className={wide ? 'md:col-span-2' : ''}>
      {field.type === 'toggle' ? (
        <div className="flex items-center justify-between gap-4 rounded-md border border-line px-4 py-3">
          <div>
            <label htmlFor={id} className="text-sm font-medium">
              {field.label}
            </label>
            <Help>{field.help}</Help>
          </div>
          {control}
        </div>
      ) : (
        <>
          <Label field={field} htmlFor={id} />
          {control}
          {error ? <p className="mt-1.5 text-sm text-red-600">{error}</p> : <Help>{field.help}</Help>}
        </>
      )}
    </div>
  )
}
