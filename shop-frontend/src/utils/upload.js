// frontend/src/utils/upload.js
// Uploads file to your backend route POST <VITE_API_URL>/api/upload
// Returns a string: the image URL (secure_url from Cloudinary)

export async function uploadImageFile(file) {
  if (!file) throw new Error("No file provided");

  const apiURL = import.meta.env.VITE_API_URL || "";

  const res = await fetch(`${apiURL}/api/upload`, {
    method: "POST",
    body: (() => {
      const fd = new FormData();
      fd.append("image", file); // multer expects field name "image"
      return fd;
    })(),
    credentials: "include",
  });

  const text = await res.text().catch(() => null);

  if (!res.ok) {
    // show backend response if available
    throw new Error(`Upload failed: ${text || res.statusText}`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new Error("Invalid JSON returned from upload API");
  }

  if (!data || !data.url) {
    throw new Error("Upload succeeded but no URL returned");
  }

  // return string (not object)
  return data.url;
}
