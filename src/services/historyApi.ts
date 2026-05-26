import api from "./api";

export interface HistoryItem {
  id: string;
  userId: string;
  rawImageUrl: string;
  augmentationImageUrl: string;
  healthyScore: number;
  status: string;
  detail: string;
  recommendation: string;
  nutritionProportion: Record<string, number> | null;
  createdAt: string;
  user?: {
    fullName: string;
    schoolName: string;
    className: string;
  };
}

export interface HistoriesResponse {
  histories: HistoryItem[];
  pagination: {
    totalData: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
}

export const historyApi = {
  /**
   * Upload gambar makanan untuk scan nutrisi via AI.
   * Backend akan meneruskan ke AI API dan menyimpan hasilnya.
   */
  createHistory: async (
    file: File,
    onUploadProgress?: (progress: number) => void
  ) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post("/histories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (event.total && onUploadProgress) {
          onUploadProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    });
    return response.data;
  },

  /** Ambil daftar riwayat scan dengan pagination dan filter opsional. */
  getHistories: async (params?: {
    page?: number;
    limit?: number;
    schoolName?: string;
    className?: string;
  }) => {
    const response = await api.get<{
      data: HistoriesResponse;
      message: string;
    }>("/histories", { params });
    return response.data;
  },

  /** Ambil detail satu riwayat scan berdasarkan ID. */
  getHistoryById: async (id: string) => {
    const response = await api.get<{
      data: HistoryItem;
      message: string;
    }>(`/histories/${id}`);
    return response.data;
  },
};
