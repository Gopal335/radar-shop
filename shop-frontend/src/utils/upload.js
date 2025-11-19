import { apiFetch } from "./api";

// Uses your backend route: POST /api/upload
export async function uploadImageFile(file) {
  const fd = new FormData();
  fd.append("image", file);   // MUST be "image" because multer expects .single("image")

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/upload`,
    {
      method: "POST",
      body: fd,
      credentials: "include"
    }
  );

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Upload failed: ${text}`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON from upload API");
  }

  // backend returns { url, public_id }
  return { url: data.url };
}
