import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScanMutation } from "../hooks/useScanMutation";
import { UploadArea } from "../components/UploadArea";
import { CameraView } from "../components/CameraView";
import { ScanTips } from "../components/ScanTips";

type ScanMode = "upload" | "camera";

const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending, uploadProgress } = useScanMutation();

  const [mode, setMode] = useState<ScanMode>("upload");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setScanError("File harus berupa gambar (jpg, png, dll.)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setScanError("Ukuran file maksimal 10MB");
      return;
    }
    setScanError(null);
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCameraCapture = (file: File, previewUrl: string) => {
    setScanError(null);
    setSelectedFile(file);
    setPreview(previewUrl);
  };

  const switchMode = (newMode: ScanMode) => {
    setMode(newMode);
    clearSelection();
  };

  const clearSelection = () => {
    setPreview(null);
    setSelectedFile(null);
    setScanError(null);
  };

  const handleScan = () => {
    if (!selectedFile) return;
    setScanError(null);
    mutate(selectedFile, {
      onSuccess: (res: any) => {
        const historyId = res?.data?.id;
        if (historyId) {
          navigate(`/scan/result/${historyId}`);
        } else {
          navigate("/history");
        }
      },
      onError: (err: any) => {
        const message =
          err.response?.data?.message ||
          "Gagal melakukan scan. Silakan coba lagi.";
        setScanError(message);
      },
    });
  };

  const isProcessing = isPending;
  const progressText =
    uploadProgress < 100
      ? "Mengunggah gambar..."
      : "Menganalisis nutrisi dengan AI...";

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="mb-6">
        <h1 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight mb-1">
          Scan Menu MBG
        </h1>
        <p className="text-on-surface-variant text-sm">
          Ambil foto atau upload gambar makanan MBG kalian untuk analisis
          nutrisi
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-2 mb-5 bg-surface-container-high/40 rounded-xl p-1">
        <button
          onClick={() => switchMode("upload")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            mode === "upload"
              ? "bg-surface-container-lowest clinical-shadow text-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-lg">upload_file</span>
          Upload File
        </button>
        <button
          onClick={() => switchMode("camera")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            mode === "camera"
              ? "bg-surface-container-lowest clinical-shadow text-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            photo_camera
          </span>
          Kamera
        </button>
      </div>

      {/* Input Mode */}
      {!preview && (
        <>
          {mode === "upload" && <UploadArea onFileSelect={handleFileSelect} />}
          {mode === "camera" && <CameraView onCapture={handleCameraCapture} />}
          <ScanTips />
        </>
      )}

      {/* Preview */}
      {preview && (
        <div className="animate-[scaleIn_0.3s_ease-out]">
          <div className="relative rounded-2xl overflow-hidden mb-4">
            <img
              src={preview}
              alt="Preview makanan"
              className="w-full aspect-[4/3] object-cover"
            />
            {!isProcessing && (
              <button
                onClick={clearSelection}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-on-surface/50 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-on-surface/70 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mb-4 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-on-surface">
                  {progressText}
                </p>
                <span className="text-xs text-primary font-semibold">
                  {uploadProgress < 100 ? `${uploadProgress}%` : "⏳"}
                </span>
              </div>
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-300"
                  style={{
                    width: uploadProgress < 100 ? `${uploadProgress}%` : "100%",
                    animation:
                      uploadProgress >= 100
                        ? "shimmer 1.5s infinite"
                        : undefined,
                    backgroundSize:
                      uploadProgress >= 100 ? "200% 100%" : undefined,
                    backgroundImage:
                      uploadProgress >= 100
                        ? "linear-gradient(90deg, var(--color-primary) 25%, var(--color-primary-container) 50%, var(--color-primary) 75%)"
                        : undefined,
                  }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {scanError && (
            <div className="flex items-center gap-2 bg-error-container/15 border border-error/20 rounded-xl px-4 py-3 mb-4 animate-[slideDown_0.3s_ease-out]">
              <span className="material-symbols-outlined text-error text-lg">
                error
              </span>
              <p className="text-sm text-error flex-1">{scanError}</p>
            </div>
          )}

          {/* Action Buttons */}
          {!isProcessing && (
            <div className="flex gap-3">
              <button
                onClick={clearSelection}
                className="flex-1 py-3 rounded-xl border border-outline-variant/20 font-headline font-bold text-sm text-on-surface hover:bg-surface-container-high transition-all cursor-pointer"
              >
                Ambil Ulang
              </button>
              <button
                onClick={handleScan}
                className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-headline font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  science
                </span>
                Analisis Nutrisi
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanPage;
