import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

/** True on large screens with a precise pointer and motion allowed — where rich motion is worth it. */
export function useRichMotion() {
  const desktop = useMediaQuery('(min-width: 1024px) and (pointer: fine)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  return desktop && !reduced
}
