import React from "react";
import type { DetectionItem } from "../../../services/historyApi";

interface ImageComparisonProps {
  rawImageUrl: string;
  augmentationImageUrl?: string;
  detections?: DetectionItem[] | null;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({
  rawImageUrl,
  detections,
}) => {
  const [imageSize, setImageSize] = React.useState<{
    naturalWidth: number;
    naturalHeight: number;
    clientWidth: number;
    clientHeight: number;
  } | null>(null);

  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const updateDimensions = () => {
    if (imageRef.current) {
      setImageSize({
        naturalWidth: imageRef.current.naturalWidth,
        naturalHeight: imageRef.current.naturalHeight,
        clientWidth: imageRef.current.clientWidth,
        clientHeight: imageRef.current.clientHeight,
      });
    }
  };

  React.useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateDimensions();
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      updateDimensions();
    }
  }, [rawImageUrl]);

  const getColorForLabel = (label: string) => {
    const normalizedLabel = label.toLowerCase();
    if (normalizedLabel.includes("karbo")) {
      return {
        border: "rgba(249, 115, 22, 1)", // orange-500
        bg: "rgba(249, 115, 22, 0.15)",
        hoverBg: "rgba(249, 115, 22, 0.3)",
        text: "#ffffff",
        solid: "rgba(249, 115, 22, 1)",
        name: "Karbohidrat",
      };
    }
    if (normalizedLabel.includes("protein")) {
      return {
        border: "rgba(14, 165, 233, 1)", // sky-500
        bg: "rgba(14, 165, 233, 0.15)",
        hoverBg: "rgba(14, 165, 233, 0.3)",
        text: "#ffffff",
        solid: "rgba(14, 165, 233, 1)",
        name: "Protein",
      };
    }
    if (
      normalizedLabel.includes("sayur") ||
      normalizedLabel.includes("serat")
    ) {
      return {
        border: "rgba(34, 197, 94, 1)", // green-500
        bg: "rgba(34, 197, 94, 0.15)",
        hoverBg: "rgba(34, 197, 94, 0.3)",
        text: "#ffffff",
        solid: "rgba(34, 197, 94, 1)",
        name: "Sayuran",
      };
    }
    if (normalizedLabel.includes("buah")) {
      return {
        border: "rgba(234, 179, 8, 1)", // yellow-500
        bg: "rgba(234, 179, 8, 0.15)",
        hoverBg: "rgba(234, 179, 8, 0.3)",
        text: "#ffffff",
        solid: "rgba(234, 179, 8, 1)",
        name: "Buah",
      };
    }
    if (normalizedLabel.includes("susu")) {
      return {
        border: "rgba(168, 85, 247, 1)", // purple-500
        bg: "rgba(168, 85, 247, 0.15)",
        hoverBg: "rgba(168, 85, 247, 0.3)",
        text: "#ffffff",
        solid: "rgba(168, 85, 247, 1)",
        name: "Susu",
      };
    }
    // Fallback
    return {
      border: "rgba(100, 116, 139, 1)", // slate-500
      bg: "rgba(100, 116, 139, 0.15)",
      hoverBg: "rgba(100, 116, 139, 0.3)",
      text: "#ffffff",
      solid: "rgba(100, 116, 139, 1)",
      name: label.charAt(0).toUpperCase() + label.slice(1),
    };
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] h-full flex flex-col">
      <div className="relative rounded-xl overflow-hidden border border-outline-variant/10 clinical-shadow bg-surface-container-low select-none flex-1 w-full min-h-[350px] lg:min-h-0">
        <img
          ref={imageRef}
          src={rawImageUrl}
          alt="Foto asli makanan"
          className="w-full h-full absolute inset-0"
          onLoad={updateDimensions}
        />

        {/* Overlays */}
        {imageSize &&
          detections &&
          detections.map((item, index) => {
            if (
              item.x === undefined ||
              item.y === undefined ||
              item.width === undefined ||
              item.height === undefined
            ) {
              return null;
            }

            const { border, bg, hoverBg, solid, name } = getColorForLabel(
              item.label,
            );
            const isHovered = hoveredIndex === index;

            const COORD_BASE = 256;

            // Jika memanjang (stretch / fill), kita langsung gunakan ukuran container
            const renderedWidth = imageSize.clientWidth;
            const renderedHeight = imageSize.clientHeight;

            const offsetX = 0;
            const offsetY = 0;

            const left = (item.x / COORD_BASE) * renderedWidth + offsetX;
            const top = (item.y / COORD_BASE) * renderedHeight + offsetY;
            const width = (item.width / COORD_BASE) * renderedWidth;
            const height = (item.height / COORD_BASE) * renderedHeight;

            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${left}px`,
                  top: `${top}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                  border: `2px solid ${border}`,
                  backgroundColor: isHovered ? hoverBg : bg,
                  boxShadow: isHovered ? `0 0 14px ${border}` : "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  zIndex: isHovered ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Badge */}
                <span
                  className="absolute top-0 left-0 text-[9px] font-bold px-1.5 py-0.5 rounded-br-md select-none transition-all duration-200"
                  style={{
                    backgroundColor: solid,
                    color: "#ffffff",
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "top left",
                  }}
                >
                  {name}
                </span>

                {/* Hover Tooltip */}
                {isHovered && (
                  <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-medium py-1 px-2 rounded shadow-lg whitespace-nowrap z-20 flex flex-col items-center gap-0.5 pointer-events-none transition-opacity duration-200"
                    style={{
                      border: `1px solid ${border}`,
                    }}
                  >
                    <span className="font-bold">{name}</span>
                    {item.confidence != null && (
                      <span className="text-white/80">
                        Akurasi: {Math.round(item.confidence * 100)}%
                      </span>
                    )}
                    {/* Arrow */}
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                      style={{
                        borderTopColor: "rgba(15, 23, 42, 0.9)",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
