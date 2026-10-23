import { useEffect, useState } from 'react'
import { Field, getPath, setPath } from './fields'
import { settingsFields } from './schemas'
import { AdminButton, Notice, PageHeader, Spinner } from './ui'
import { defaultSettings, getSettingsDoc, saveSettings } from '../services/content'

export default function Settings() {
  const [values, setValues] = useState(null)
  const [stored, setStored] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    getSettingsDoc()
      .then((doc) => {
        setStored(Boolean(doc))
        setValues({ ...defaultSettings, ...(doc || {}), socials: { ...defaultSettings.socials, ...(doc?.socials || {}) } })
      })
      .catch((err) => setStatus({ tone: 'error', text: err.message }))
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setStatus(null)
    try {
      const data = { ...values }
      delete data.updatedAt
      if (Array.isArray(data.markets)) data.markets = data.markets.map((s) => s.trim()).filter(Boolean)
      await saveSettings(data)
      setStored(true)
      setStatus({ tone: 'success', text: 'Settings saved. The website shows the changes on the next page load.' })
    } catch (err) {
      setStatus({ tone: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  if (!values) {
    return (
      <div className="grid place-items-center p-16">
        {status ? <Notice tone="error">{status.text}</Notice> : <Spinner />}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <PageHeader title="Site settings" description="Contact details, homepage text, founder’s note and policies.">
        <AdminButton type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save settings'}
        </AdminButton>
      </PageHeader>
      <div className="space-y-4">
        {!stored && <Notice>These are the website’s built-in settings. Saving stores them in Firestore so future edits apply.</Notice>}
        {status && <Notice tone={status.tone}>{status.text}</Notice>}
        <div className="grid gap-5 rounded-lg border border-line bg-white p-6 md:grid-cols-2">
          {settingsFields.map((f, i) => (
            <Field
              key={f.name || `s${i}`}
              field={f}
              value={f.name ? getPath(values, f.name) : undefined}
              values={values}
              folder="settings"
              onChange={(v) => setValues((s) => setPath(s, f.name, v))}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <AdminButton type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save settings'}
          </AdminButton>
        </div>
      </div>
    </form>
  )
}
