// React 19 hoists <title> and <meta> into <head>.
export default function Meta({ title, description, image }) {
  const full = title ? `${title} — Ideaxcorp` : 'Ideaxcorp — Web and Digital Solutions Agency in Kerala & UAE'
  return (
    <>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image.startsWith('http') ? image : `https://ideaxcorp.com${image}`} />}
    </>
  )
}
