import { useEffect, useMemo, useState } from 'react'
import { deleteItem, listAll, updateItem } from '../services/content'
import { formatDate, telHref, whatsappHref } from '../utils/format'
import { AdminButton, Badge, ConfirmDialog, Notice, PageHeader, Spinner } from './ui'

const toMillis = (t) => (t?.toMillis ? t.toMillis() : 0)

export default function Messages() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const [removing, setRemoving] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    listAll('messages', 'createdAt', 'desc')
      .then((list) => setItems(list.sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt))))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const shown = useMemo(() => (filter === 'unread' ? items.filter((m) => !m.read) : items), [items, filter])

  async function setRead(m, read) {
    await updateItem('messages', m.id, { read })
    setItems((list) => list.map((x) => (x.id === m.id ? { ...x, read } : x)))
  }

  function toggleOpen(m) {
    setOpenId(openId === m.id ? null : m.id)
    if (!m.read) setRead(m, true).catch(() => {})
  }

  async function confirmDelete() {
    setBusy(true)
    try {
      await deleteItem('messages', removing.id)
      setItems((list) => list.filter((x) => x.id !== removing.id))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
      setRemoving(null)
    }
  }

  const unread = items.filter((m) => !m.read).length

  return (
    <>
      <PageHeader title="Messages" description={`${items.length} total · ${unread} unread`}>
        {['all', 'unread'].map((f) => (
          <AdminButton key={f} variant={filter === f ? 'dark' : 'ghost'} onClick={() => setFilter(f)} className="capitalize">
            {f}
          </AdminButton>
        ))}
      </PageHeader>
      {error && <Notice tone="error">{error}</Notice>}

      <div className="overflow-hidden rounded-lg border border-line bg-white">
        {loading ? (
          <div className="grid place-items-center p-12">
            <Spinner />
          </div>
        ) : shown.length === 0 ? (
          <p className="p-12 text-center text-graphite">{filter === 'unread' ? 'You’re all caught up.' : 'No messages yet.'}</p>
        ) : (
          <ul className="divide-y divide-line">
            {shown.map((m) => {
              const isOpen = openId === m.id
              return (
                <li key={m.id}>
                  <button type="button" onClick={() => toggleOpen(m)} aria-expanded={isOpen} className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-mist/60">
                    <span className={`size-2 shrink-0 rounded-full ${m.read ? 'bg-transparent' : 'bg-violet'}`} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate ${m.read ? '' : 'font-semibold'}`}>
                        {m.name} <span className="font-normal text-graphite">· {m.email}</span>
                      </span>
                      <span className="block truncate text-sm text-graphite">{m.message}</span>
                    </span>
                    <Badge>{m.subject}</Badge>
                    <span className="hidden w-28 shrink-0 text-right text-sm text-smoke sm:block">{formatDate(m.createdAt)}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-line bg-mist/40 px-5 py-5 sm:pl-11">
                      <dl className="grid gap-2 text-sm sm:grid-cols-3">
                        <div>
                          <dt className="text-graphite">Email</dt>
                          <dd>
                            <a className="text-violet hover:underline" href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`}>
                              {m.email}
                            </a>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-graphite">Phone</dt>
                          <dd>{m.phone ? <a href={telHref(m.phone)}>{m.phone}</a> : '—'}</dd>
                        </div>
                        <div>
                          <dt className="text-graphite">Received</dt>
                          <dd>{m.createdAt?.toDate ? m.createdAt.toDate().toLocaleString('en-GB') : '—'}</dd>
                        </div>
                      </dl>
                      <p className="mt-5 whitespace-pre-wrap rounded-md bg-white p-4 leading-relaxed">{m.message}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`}
                          className="inline-flex h-10 items-center rounded-md bg-violet px-4 text-sm font-semibold text-white hover:bg-violet-deep"
                        >
                          Reply by email
                        </a>
                        {m.phone && (
                          <a
                            href={whatsappHref(m.phone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 items-center rounded-md border border-line bg-white px-4 text-sm font-semibold hover:bg-mist"
                          >
                            WhatsApp
                          </a>
                        )}
                        <AdminButton variant="ghost" onClick={() => setRead(m, !m.read)}>
                          Mark as {m.read ? 'unread' : 'read'}
                        </AdminButton>
                        <AdminButton variant="ghost" className="text-red-600" onClick={() => setRemoving(m)}>
                          Delete
                        </AdminButton>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(removing)}
        title="Delete this message?"
        body={removing ? `The message from ${removing.name} will be permanently deleted.` : ''}
        busy={busy}
        onCancel={() => setRemoving(null)}
        onConfirm={confirmDelete}
      />
    </>
  )
}
