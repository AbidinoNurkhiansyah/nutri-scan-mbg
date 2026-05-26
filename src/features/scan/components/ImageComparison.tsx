import React from "react";

interface ImageComparisonProps {
  rawImageUrl: string;
  augmentationImageUrl?: string;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({
  rawImageUrl,
  augmentationImageUrl,
}) => (
  <div className="grid grid-cols-2 gap-3 mb-5">
    <div>
      <p className="text-[10px] uppercase tracking-wider text-outline font-semibold mb-1.5">
        Foto Asli
      </p>
      <div className="rounded-xl overflow-hidden border border-outline-variant/10 clinical-shadow">
        <img
          src={rawImageUrl}
          alt="Foto asli makanan"
          className="w-full aspect-square object-cover"
        />
      </div>
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-wider text-outline font-semibold mb-1.5">
        Segmentasi AI
      </p>
      <div className="rounded-xl overflow-hidden border border-outline-variant/10 clinical-shadow">
        {augmentationImageUrl ? (
          <img
            src={augmentationImageUrl}
            alt="Hasil segmentasi AI"
            className="w-full aspect-square object-cover"
          />
        ) : (
          <div className="w-full aspect-square bg-surface-container-high flex items-center justify-center">
            <span className="text-xs text-on-surface-variant">Tidak ada</span>
          </div>
        )}
      </div>
    </div>
  </div>
);
