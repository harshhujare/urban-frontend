import { User } from "lucide-react";
import { useState, useRef } from "react";
import apiClient from "../../api/config";

export default function ProfileImageUpload({ currentImage, onImageUpdate }) {
  const [uploading, setUploading] = useState(false);
  const [tempPreview, setTempPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    // Show temporary preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await apiClient.post(
        "/upload/profile-picture",
        formData,
      );

      console.log("Upload successful, URL:", response.image);

      // Clear temp preview and update parent with new image URL
      setTempPreview(null);
      onImageUpdate(response.image);

      // Show success message
      alert(
        "Profile picture uploaded successfully! Click 'Save' to update your profile.",
      );
    } catch (error) {
      console.error("Image upload failed:", error);
      const errorMessage =
        error.message || "Failed to upload image. Please try again.";
      alert(`Upload failed: ${errorMessage}`);
      setTempPreview(null);
    } finally {
      setUploading(false);
    }
  };

  // Determine which image to show (temp preview during upload, otherwise current)
  const displayImage = tempPreview || currentImage;
  const hasImage = displayImage && displayImage.trim() !== "";

  console.log("=== ProfileImageUpload ===");
  console.log("currentImage:", currentImage);
  console.log("tempPreview:", tempPreview ? "Present" : "null");
  console.log("displayImage:", displayImage);
  console.log("hasImage:", hasImage);
  console.log("========================");

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={handleImageClick}
        className="relative w-32 h-32 rounded-full cursor-pointer group overflow-hidden border-4 border-gray-200 hover:border-gray-300 transition-all duration-300 bg-white"
      >
        {hasImage ? (
          <img
            src={displayImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <User className="w-16 h-16 text-gray-500" />
          </div>
        )}

        {/* Upload overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
          <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
            {uploading ? "Uploading..." : "Change Photo"}
          </span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        disabled={uploading}
      />

      <p className="text-xs text-gray-500 text-center">
        Click to upload a new photo
        <br />
        Max size: 5MB
      </p>
    </div>
  );
}
