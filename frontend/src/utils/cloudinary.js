
export const uploadFileAndGetURL = async (file) => {
  const cloudName = "dkfwdrqhf";        // 🔁 Replace with your Cloudinary cloud name
  const uploadPreset = "btp-sem-6";  // 🔁 Replace with your unsigned upload preset

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (response.ok) {
      return data.secure_url; // ✅ Cloudinary file URL
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};