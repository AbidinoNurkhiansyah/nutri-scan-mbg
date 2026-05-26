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
        <h1 className="font-display text-2xl font-extrabold tracking-tight mb-1">
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
          {/* History Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {histories.map((item) => {
              const isBalanced =
                item.status?.toLowerCase() === "seimbang";

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(`/history/${item.id}`)}
                  className="bg-surface-container-lowest rounded-xl clinical-shadow border border-outline-variant/10 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group text-left"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={item.rawImageUrl}
                      alt="Scan makanan"
                      className="w-full aspect-[16/10] object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                          isBalanced
                            ? "bg-primary/80 text-white"
                            : "bg-tertiary/80 text-white"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-xs"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {isBalanced ? "check_circle" : "warning"}
                        </span>
                        {item.status || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-on-surface">
                          Skor: {item.healthyScore?.toFixed(0) ?? "-"}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            (item.healthyScore ?? 0) >= 70
                              ? "bg-primary"
                              : (item.healthyScore ?? 0) >= 40
                              ? "bg-secondary"
                              : "bg-tertiary"
                          }`}
                        />
                      </div>
                      <span className="material-symbols-outlined text-lg text-outline group-hover:text-primary transition-colors">
                        chevron_right
                      </span>
                    </div>
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
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                )
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
