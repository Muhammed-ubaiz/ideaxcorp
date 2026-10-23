import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { where } from 'firebase/firestore/lite'
import { countDocs, importDefaultContent, recentMessages, COLLECTIONS } from '../services/content'
import { useAuth } from '../hooks/useAuth'
import { formatDate } from '../utils/format'
import { AdminButton, Badge, Notice, PageHeader, Spinner } from './ui'
import { schemas } from './schemas'

export default function Dashboard() {
  const { user } = useAuth()
  const [counts, setCounts] = useState(null)
  const [unread, setUnread] = useState(0)
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const [importing, setImporting] = useState(false)
  const [report, setReport] = useState(null)

  async function load() {
    try {
      const names = Object.keys(COLLECTIONS)
      const values = await Promise.all(names.map((n) => countDocs(n)))
      setCounts(Object.fromEntries(names.map((n, i) => [n, values[i]])))
      setUnread(await countDocs('messages', [where('read', '==', false)]))
      setMessages(await recentMessages(5))
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function runImport() {
    setImporting(true)
    setReport(null)
    try {
      setReport({ ok: true, lines: await importDefaultContent() })
      await load()
    } catch (err) {
      setReport({ ok: false, lines: [err.message] })
    } finally {
      setImporting(false)
    }
  }

  const empty = counts && Object.values(counts).some((n) => n === 0)

  return (
    <>
      <PageHeader title="Dashboard" description={`Signed in as ${user?.email}`} />
      {error && <Notice tone="error">{error}</Notice>}

      {empty && (
        <div className="mb-8 rounded-lg border border-violet/25 bg-white p-6">
          <h2 className="font-semibold">Import the current website content</h2>
          <p className="mt-1 max-w-2xl text-sm text-graphite">
            Some collections are empty, so the website is showing its built-in content for them. Import copies that content into Firestore so you can edit
            it here. Collections that already have items are left untouched.
          </p>
          <AdminButton className="mt-4" onClick={runImport} disabled={importing}>
            {importing ? 'Importing…' : 'Import website content'}
          </AdminButton>
          {report && (
            <div className="mt-4">
              <Notice tone={report.ok ? 'success' : 'error'}>
                <ul className="list-disc pl-5">
                  {report.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </Notice>
            </div>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/admin/messages" className="rounded-lg bg-ink p-5 text-white transition-colors hover:bg-ink-2">
          <p className="text-sm text-white/60">Unread messages</p>
          <p className="display mt-3 text-5xl">{counts ? unread : '–'}</p>
        </Link>
        {Object.keys(COLLECTIONS).map((name) => (
          <Link key={name} to={`/admin/${name}`} className="rounded-lg border border-line bg-white p-5 transition-colors hover:border-violet">
            <p className="text-sm text-graphite">{schemas[name].title}</p>
            <p className="display mt-3 text-5xl">{counts ? counts[name] : '–'}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Latest messages</h2>
          <Link to="/admin/messages" className="text-sm font-semibold text-violet hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-line bg-white">
          {!counts ? (
            <div className="grid place-items-center p-10">
              <Spinner />
            </div>
          ) : messages.length === 0 ? (
            <p className="p-8 text-center text-graphite">No messages yet. Contact form submissions will appear here.</p>
          ) : (
            <ul className="divide-y divide-line">
              {messages.map((m) => (
                <li key={m.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {m.name} <span className="font-normal text-graphite">· {m.subject}</span>
                    </p>
                    <p className="truncate text-sm text-graphite">{m.message}</p>
                  </div>
                  {!m.read && <Badge tone="violet">New</Badge>}
                  <span className="hidden shrink-0 text-sm text-smoke sm:block">{formatDate(m.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
