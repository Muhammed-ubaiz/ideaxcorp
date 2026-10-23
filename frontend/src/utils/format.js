export function formatDate(value, opts = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!value) return ''
  const d = value?.toDate ? value.toDate() : new Date(value)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', opts)
}

export const slugify = (s = '') =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

export const telHref = (phone = '') => `tel:${phone.replace(/[^\d+]/g, '')}`

export const whatsappHref = (number, message) =>
  `https://wa.me/${String(number).replace(/\D/g, '')}${message ? `?text=${encodeURIComponent(message)}` : ''}`

export const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

export const paragraphs = (text = '') => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

export function youtubeId(url = '') {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}
