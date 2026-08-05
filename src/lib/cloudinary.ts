export async function uploadToCloudinary(
  file: File,
  cloudName: string,
  uploadPreset: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = (await res.json()) as any;
    throw new Error(err.error?.message || "Gagal mengunggah gambar ke Cloudinary");
  }

  const data = (await res.json()) as any;
  return data.secure_url;
}
