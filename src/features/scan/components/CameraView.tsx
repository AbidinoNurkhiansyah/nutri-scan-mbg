import React, { useEffect } from "react";
import { useCamera } from "../hooks/useCamera";

interface CameraViewProps {
  onCapture: (file: File, previewUrl: string) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
  const {
    cameraActive,
    cameraError,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    capturePhoto,
  } = useCamera();

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="rounded-2xl overflow-hidden bg-on-surface">
      {/* Render tombol Buka Kamera jika tidak aktif */}
      {!cameraActive && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          {cameraError ? (
            <>
              <div className="w-14 h-14 rounded-full bg-error-container/20 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-error text-2xl">
                  videocam_off
                </span>
              </div>
              <p className="text-white/70 text-sm text-center mb-4">
                {cameraError}
              </p>
              <button
                onClick={startCamera}
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm cursor-pointer hover:bg-primary/90 transition-colors"
              >
                Coba Lagi
              </button>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-white text-2xl">
                  photo_camera
                </span>
              </div>
              <p className="text-white/70 text-sm text-center mb-4">
                Arahkan kamera ke ompreng
              </p>
              <button
                onClick={startCamera}
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm cursor-pointer hover:bg-primary/90 transition-colors"
              >
                Buka Kamera
              </button>
            </>
          )}
        </div>
      )}

      {/* Selalu render video agar videoRef tidak null saat startCamera dieksekusi */}
      <div className={`relative ${cameraActive ? "block" : "hidden"}`}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full aspect-[4/3] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 border-2 border-white/40 rounded-3xl" />
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
          <button
            onClick={stopCamera}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <button
            onClick={() => capturePhoto(onCapture)}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer relative hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="absolute inset-0 rounded-full bg-white/50 animate-[pulse-ring_2s_infinite]" />
            <div className="w-12 h-12 rounded-full bg-primary" />
          </button>
          <div className="w-12 h-12" />
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
