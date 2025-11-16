export const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function uploadImageFile(file) {
  const fd = new FormData();
  fd.append('image', file);
  const res = await fetch(`/api/upload`, {
    method: 'POST',
    body: fd,
    credentials: 'include' // if you use sessions
  });
  if (!res.ok) {
    const txt = await res.text().catch(()=>null);
    throw new Error(txt || 'Upload failed');
  }
  const data = await res.json();
  return data.url;
}