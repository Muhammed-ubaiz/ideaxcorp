import { useEffect, useRef } from 'react'

export function PageHeader({ title, description, children }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="display-md text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-graphite">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  )
}

export function AdminButton({ variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-violet text-white hover:bg-violet-deep',
    dark: 'bg-ink text-white hover:bg-ink-2',
    ghost: 'border border-line bg-white text-ink hover:bg-mist',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  )
}

export function Badge({ tone = 'neutral', children }) {
  const tones = {
    neutral: 'bg-mist text-graphite',
    green: 'bg-emerald-50 text-emerald-700',
    violet: 'bg-lilac text-violet-deep',
    amber: 'bg-amber-50 text-amber-700',
  }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>
}

export function Notice({ tone = 'info', children }) {
  const tones = {
    info: 'border-violet/20 bg-lilac/40 text-ink',
    error: 'border-red-200 bg-red-50 text-red-800',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    warn: 'border-amber-200 bg-amber-50 text-amber-900',
  }
  return <div className={`rounded-md border px-4 py-3 text-sm ${tones[tone]}`}>{children}</div>
}

/** In-page confirmation dialog (no browser confirm()). */
export function ConfirmDialog({ open, title, body, confirmLabel = 'Delete', onConfirm, onCancel, busy }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog ref={ref} onCancel={onCancel} className="m-auto w-[min(28rem,calc(100%-2rem))] rounded-lg p-0 backdrop:bg-ink/50">
      <div className="p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        {body && <p className="mt-2 text-graphite">{body}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <AdminButton variant="ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </AdminButton>
          <AdminButton variant="danger" onClick={onConfirm} disabled={busy}>
            {busy ? 'Working…' : confirmLabel}
          </AdminButton>
        </div>
      </div>
    </dialog>
  )
}

export function Spinner() {
  return <span className="inline-block size-5 animate-spin rounded-full border-2 border-violet border-t-transparent" aria-label="Loading" />
}
