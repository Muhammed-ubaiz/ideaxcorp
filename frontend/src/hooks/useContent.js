import { useEffect, useState } from 'react'
import { fetchPublished, fetchSettings, defaultSettings } from '../services/content'

/** Published items of a public collection (Firestore, or bundled content as a fallback). */
export function useCollection(name) {
  const [state, setState] = useState({ data: [], loading: true, error: null })
  useEffect(() => {
    let live = true
    fetchPublished(name).then(
      (data) => live && setState({ data, loading: false, error: null }),
      (error) => live && setState({ data: [], loading: false, error }),
    )
    return () => {
      live = false
    }
  }, [name])
  return state
}

export function useSettings() {
  const [settings, setSettings] = useState(defaultSettings)
  useEffect(() => {
    let live = true
    fetchSettings().then((s) => live && setSettings(s))
    return () => {
      live = false
    }
  }, [])
  return settings
}
