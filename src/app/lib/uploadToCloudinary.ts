// lib/uploadToCloudinary.ts

export async function uploadToCloudinary(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "athleto_unsigned");
  formData.append("folder", "athleto-products"); // Optional: ensures correct folder

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dul5jul1j/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Cloudinary upload failed:", res.statusText);
      return null;
    }

    const data = await res.json();
    return data.secure_url || null;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}
