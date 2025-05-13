import React, { useRef, useState } from "react";

/**
 * SingleImage Component
 * - Allows uploading a single image
 * - Displays a preview
 * - Provides edit (change) and remove functionality
 *
 * Props:
 * - initialUrl: string (optional) - preloaded image URL
 * - onChange: function(file: File | null) - callback when image is added or removed
 */
export default function SingleImage({ initialUrl = null, onChange }) {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(initialUrl);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onChange?.(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
    onChange?.(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative  w-[80px] h-[80px] border-2 border-dashed border-borderColor rounded-lg overflow-hidden bg-lightBg">
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Preview"
              className="object-cover w-full h-full"
            />
            {/* Remove button positioned top-right */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-0 right-0 m-1 bg-danger hover:bg-hoverDanger text-white text-xs py-1 px-2 rounded-full shadow transition duration-200"
            >
              X
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-secondaryText">No image selected</span>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={handleClickUpload}
        className="mt-4 bg-primary hover:bg-hoverPrimary text-white py-1 px-3 rounded-lg shadow transition duration-200"
      >
        {previewUrl ? 'Change' : 'Upload'}
      </button>
    </div>
  );
}
