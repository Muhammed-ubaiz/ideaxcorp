import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase/admin'

export const MAX_UPLOAD_MB = 8

/** Uploads a file to Storage under uploads/<folder>/ and resolves with its public URL. */
export function uploadFile(file, folder, onProgress) {
  if (!storage) return Promise.reject(new Error('Firebase Storage is not configured. Paste an image URL instead.'))
  if (!/^(image|video)\//.test(file.type)) return Promise.reject(new Error('Choose an image or video file.'))
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    return Promise.reject(new Error(`Files must be under ${MAX_UPLOAD_MB} MB.`))
  }
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-')
  const task = uploadBytesResumable(ref(storage, `uploads/${folder}/${Date.now()}-${safe}`), file, {
    contentType: file.type,
    cacheControl: 'public, max-age=31536000',
  })
  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (s) => onProgress?.(Math.round((s.bytesTransferred / s.totalBytes) * 100)),
      reject,
      () => getDownloadURL(task.snapshot.ref).then(resolve, reject),
    )
  })
}
