// src/Components/FileUploader/FileUploader.jsx

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineUpload, HiTrash } from "react-icons/hi";

const MAX_SIZE_MB = 2; // 2 MB
const MAX_FILES = 5;

const FileUploader = ({ onFilesChange }) => {
  const [filePreviews, setFilePreviews] = useState([]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0) {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        name: file.name,
        type: file.type,
      }));

      setFilePreviews((prev) => {
        const updated = [...prev, ...newFiles].slice(0, MAX_FILES);
        onFilesChange(updated.map(f => f.file)); // Only file objects sent to parent
        return updated;
      });
    }

    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach((file) => {
        if (file.errors.some(err => err.code === "file-too-large")) {
          alert("File is larger than 2MB!");
        }
        if (file.errors.some(err => err.code === "file-invalid-type")) {
          alert("Only JPEG, PNG, or PDF files are allowed!");
        }
        if (file.errors.some(err => err.code === "too-many-files")) {
          alert("You can upload up to 5 files only!");
        }
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "application/pdf": []
    },
    onDrop,
    maxSize: MAX_SIZE_MB * 1024 * 1024,
    maxFiles: MAX_FILES,
  });

  const removeFile = (index) => {
    setFilePreviews((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onFilesChange(updated.map(f => f.file));
      return updated;
    });
  };

  const resetFiles = () => {
    setFilePreviews([]);
    onFilesChange([]);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:bg-gray-50 transition"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500 flex items-center gap-2">
          <HiOutlineUpload className="text-xl" /> Click or drag JPEG, PNG, or PDF files (Max 5 files, 2MB each)
        </p>
      </div>

      {filePreviews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filePreviews.map((file, index) => (
            <div key={index} className="relative group">
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={`Preview ${index}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500 text-sm text-center px-2">{file.name}</p>
                </div>
              )}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md text-red-500 hover:bg-red-100 hidden group-hover:block"
              >
                <HiTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {filePreviews.length > 0 && (
        <button
          type="button"
          onClick={resetFiles}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Reset All Files
        </button>
      )}
    </div>
  );
};

export default FileUploader;
