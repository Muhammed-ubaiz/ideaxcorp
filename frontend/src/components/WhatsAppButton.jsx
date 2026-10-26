import { WhatsApp } from './Icons'
import { useSettings } from '../hooks/useContent'
import { whatsappHref } from '../utils/format'

export default function WhatsAppButton() {
  const s = useSettings()
  if (!s.whatsapp) return null
  return (
    <a
      href={whatsappHref(s.whatsapp, s.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-chrome
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-cinema hover:scale-110 sm:right-6 sm:bottom-6"
    >
      <WhatsApp className="size-7" />
    </a>
  )
}
