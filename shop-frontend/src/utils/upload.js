// utils/upload.js
export async function uploadImageFile(file) {
  const fd = new FormData();
  fd.append("image", file); // multer expects "image"

  const apiURL = import.meta.env.VITE_API_URL || "";

  const res = await fetch(`${apiURL}/api/upload`, {
    method: "POST",
    body: fd
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Upload failed: ${text}`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON response from upload API");
  }

  return data.url; // return only URL
}
