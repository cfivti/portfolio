/** Prefix internal path with Astro base (e.g. /portfolio/). */
export function withBase(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const rawBase = import.meta.env.BASE_URL;
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  if (path === '/' || path === '') return base;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}
