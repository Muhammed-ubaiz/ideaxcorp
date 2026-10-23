import { useState } from 'react'
import Button from './Button'
import { Check } from './Icons'
import { submitMessage } from '../services/content'
import { useSettings } from '../hooks/useContent'

export const SUBJECTS = [
  'General inquiry',
  'Logo & branding',
  'Website development',
  'Social media',
  'Performance marketing',
  'SEO',
  'Google Business Profile',
  'E-commerce',
  'Price plans',
]

const EMPTY = { name: '', phone: '', email: '', subject: SUBJECTS[0], message: '', company: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address, like name@company.com.'
  if (v.phone && !/^[+()\d\s-]{6,20}$/.test(v.phone.trim())) e.phone = 'Use digits only, with an optional country code.'
  if (v.message.trim().length < 10) e.message = 'Tell us a little more — at least 10 characters.'
  if (v.message.length > 4000) e.message = 'Keep your message under 4,000 characters.'
  return e
}

function Field({ label, error, id, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-smoke">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls = (err) =>
  `w-full border-0 border-b-2 bg-transparent px-0 py-3 text-lg text-ink outline-none transition-colors placeholder:text-smoke focus:border-violet focus:ring-0 ${
    err ? 'border-red-500' : 'border-line'
  }`

export default function ContactForm({ defaultSubject }) {
  const settings = useSettings()
  const [values, setValues] = useState({ ...EMPTY, subject: defaultSubject || EMPTY.subject })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [failure, setFailure] = useState('')

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (values.company) return setStatus('sent') // honeypot: bots fill hidden fields
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    setStatus('sending')
    try {
      await submitMessage(values)
      setStatus('sent')
      setValues(EMPTY)
    } catch (err) {
      setFailure(err.message)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex min-h-[26rem] flex-col items-start justify-center" role="status">
        <span className="grid size-14 place-items-center rounded-[4px] bg-violet text-white">
          <Check className="size-7" />
        </span>
        <h3 className="display-md mt-8 text-4xl">Message sent.</h3>
        <p className="lead mt-4 max-w-md">Thanks for reaching out. {settings.responseTime}</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-8 font-semibold text-violet underline underline-offset-4">
          Send another message
        </button>
      </div>
    )
  }

  const props = (k) => ({
    id: `cf-${k}`,
    value: values[k],
    onChange: set(k),
    'aria-invalid': Boolean(errors[k]),
    'aria-describedby': errors[k] ? `cf-${k}-error` : undefined,
    className: inputCls(errors[k]),
  })

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      <Field label="Full name" id="cf-name" error={errors.name}>
        <input {...props('name')} autoComplete="name" />
      </Field>
      <Field label="Phone number" id="cf-phone" error={errors.phone} optional>
        <input {...props('phone')} type="tel" autoComplete="tel" placeholder="+971" />
      </Field>
      <Field label="Email" id="cf-email" error={errors.email}>
        <input {...props('email')} type="email" autoComplete="email" />
      </Field>
      <Field label="What can we help with?" id="cf-subject">
        <select {...props('subject')} className={`${inputCls()} cursor-pointer`}>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field label="Message" id="cf-message" error={errors.message}>
          <textarea {...props('message')} rows={4} className={`${inputCls(errors.message)} resize-y`} />
        </Field>
      </div>
      {/* Honeypot, hidden from people and assistive tech */}
      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} name="company" />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>
        {status === 'error' && (
          <p className="text-sm text-red-600" role="alert">
            {failure} Email us directly at{' '}
            <a className="underline" href={`mailto:${settings.email}`}>
              {settings.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  )
}
