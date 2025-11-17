export const API_BASE = import.meta.env.VITE_API_URL || ''; // production absolute or empty for dev (use proxy)

export async function apiFetch(path, opts = {}) {
  const url = API_BASE ? `${API_BASE}${path}` : path; // if API_BASE set, call absolute URL; else relative (proxy)
  const res = await fetch(url, opts);
  const text = await res.text();
  if (!res.ok) {
    // include body for easier debugging
    const err = new Error(`HTTP ${res.status}: ${text}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}