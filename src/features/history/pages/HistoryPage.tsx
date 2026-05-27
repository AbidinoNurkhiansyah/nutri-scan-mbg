import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistories } from "../hooks/useHistories";
import { LoadingSpinner } from "../../../shared/components/ui/LoadingSpinner";
import { EmptyState } from "../../../shared/components/ui/EmptyState";

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError } = useHistories({ page, limit });

  const histories = data?.data?.histories || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="mb-6">
        <h1 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight mb-1">
          Riwayat Scan
        </h1>
        <p className="text-on-surface-variant text-sm">
          Semua hasil analisis nutrisi makanan Anda
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Memuat riwayat..." />
      ) : isError ? (
        <div className="text-center py-12">
          <div className="w-14 h-14 rounded-full bg-error-container/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-error text-2xl">
              cloud_off
            </span>
          </div>
          <p className="text-sm text-on-surface-variant">
            Gagal memuat riwayat. Periksa koneksi internet Anda.
          </p>
        </div>
      ) : histories.length === 0 ? (
        <EmptyState
          icon="no_food"
          title="Belum Ada Riwayat"
          description="Mulai scan makanan pertamamu untuk melihat riwayat analisis nutrisi di sini."
          action={
            <button
              onClick={() => navigate("/scan")}
              className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-headline font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                photo_camera
              </span>
              Scan Makanan
            </button>
          }
        />
      ) : (
        <>
          {/* History List View */}
          <div className="flex flex-col gap-3 mb-6">
            {histories.map((item) => {
              const isBalanced = item.status?.toLowerCase() === "seimbang";

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(`/history/${item.id}`)}
                  className="bg-surface-container-lowest rounded-xl clinical-shadow border border-outline-variant/10 hover:shadow-md hover:-translate-y-[1px] transition-all cursor-pointer group text-left flex items-center p-3 gap-4"
                >
                  {/* Image Thumbnail */}
                  <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-surface-container">
                    <img
                      src={item.rawImageUrl}
                      alt="Scan makanan"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isBalanced
                            ? "bg-primary/10 text-primary"
                            : "bg-tertiary/10 text-tertiary"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-[10px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {isBalanced ? "check_circle" : "warning"}
                        </span>
                        {item.status || "N/A"}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-on-surface mb-0.5 truncate">
                      Skor Nutrisi: {item.healthyScore?.toFixed(0) ?? "-"}
                    </p>

                    <p className="text-[11px] text-on-surface-variant">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Right actions/Score indicator */}
                  <div className="flex items-center gap-3 pr-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        (item.healthyScore ?? 0) >= 70
                          ? "bg-primary shadow-[0_0_8px_rgba(var(--color-primary),0.5)]"
                          : (item.healthyScore ?? 0) >= 40
                            ? "bg-secondary"
                            : "bg-tertiary"
                      }`}
                    />
                    <span className="material-symbols-outlined text-xl text-outline-variant group-hover:text-primary group-hover:translate-x-1 transition-all">
                      chevron_right
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pb-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-lg bg-surface-container-high/50 flex items-center justify-center hover:bg-surface-container-highest transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-lg">
                  chevron_left
                </span>
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    // Show max 5 pages around current
                    return (
                      p === 1 ||
                      p === pagination.totalPages ||
                      Math.abs(p - page) <= 1
                    );
                  })
                  .map((p, idx, arr) => (
                    <React.Fragment key={p}>
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <span className="text-xs text-outline px-1">…</span>
                      )}
                      <button
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                          p === page
                            ? "bg-primary text-on-primary shadow-sm"
                            : "bg-surface-container-high/50 text-on-surface-variant hover:bg-surface-container-highest"
                        }`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  ))}
              </div>
              <button
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={page === pagination.totalPages}
                className="w-9 h-9 rounded-lg bg-surface-container-high/50 flex items-center justify-center hover:bg-surface-container-highest transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryPage;
