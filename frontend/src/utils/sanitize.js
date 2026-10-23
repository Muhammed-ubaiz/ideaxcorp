import DOMPurify from 'dompurify'

// Blog bodies and the privacy policy are admin-edited HTML; sanitize before rendering.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && /^https?:/.test(node.getAttribute('href') || '')) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

export const sanitizeHtml = (html = '') =>
  DOMPurify.sanitize(html, { ADD_ATTR: ['target', 'loading'], FORBID_TAGS: ['style', 'form', 'input'] })
