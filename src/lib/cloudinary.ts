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

export async function deleteFromCloudinary(url: string, cloudName: string, apiKey: string, apiSecret: string): Promise<boolean> {
  if (!url || typeof url !== 'string' || !url.includes('cloudinary')) {
    return false;
  }

  try {
    const urlParts = url.split('/upload/');
    if (urlParts.length !== 2) return false;
    
    const afterUpload = urlParts[1];
    
    const versionMatch = afterUpload.match(/v\d+\/(.+)$/);
    let publicIdWithExt = afterUpload;
    
    if (versionMatch) {
       publicIdWithExt = versionMatch[1];
    } else {
       const parts = afterUpload.split('/');
       publicIdWithExt = parts.filter(p => !p.includes(',')).join('/');
    }
    
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const strToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret.trim()}`;
    
    const encoder = new TextEncoder();
    const data = encoder.encode(strToSign);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp);
    formData.append("api_key", apiKey.trim());
    formData.append("signature", signature);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/destroy`, {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    return result.result === 'ok';
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
}
