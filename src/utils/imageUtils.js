/* =========================================================
   GEDİZ TANTUNİ — IMAGE PATH RESOLUTION HELPER
   Ensures images load 100% reliably on GitHub Pages, Vercel,
   Netlify, and local dev server without path breakages.
   ========================================================= */

export function resolveImagePath(url) {
  if (!url) return './images/img_1_1784471051133.webp';
  
  // If external URL (http/https/data:), return unchanged
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // Convert root-absolute paths (/images/...) to relative paths (./images/...)
  if (url.startsWith('/images/')) {
    return '.' + url;
  }

  if (url.startsWith('/')) {
    return '.' + url;
  }

  return url;
}
