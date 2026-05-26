import React, { useState, useRef } from "react";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
        dragOver
          ? "border-primary bg-primary-container/10 scale-[1.01]"
          : "border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-low"
      }`}
    >
      <div className="w-16 h-16 rounded-2xl bg-primary-container/15 flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-primary text-3xl">
          cloud_upload
        </span>
      </div>
      <p className="font-headline font-bold text-on-surface mb-1">
        Seret & Lepas Gambar
      </p>
      <p className="text-xs text-on-surface-variant mb-3">
        atau klik untuk pilih dari perangkat
      </p>
      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
        <span className="material-symbols-outlined text-sm">
          folder_open
        </span>
        Pilih File
      </span>
      <p className="text-[10px] text-outline mt-3">
        Format: JPG, PNG, WebP · Maksimal 10MB
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};
