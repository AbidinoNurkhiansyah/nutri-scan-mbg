import { useQuery } from "@tanstack/react-query";
import { historyApi } from "../../../services/historyApi";

export function useHistories(params?: {
  page?: number;
  limit?: number;
  schoolName?: string;
  className?: string;
}) {
  return useQuery({
    queryKey: ["histories", params],
    queryFn: () => historyApi.getHistories(params),
  });
}

export function useHistoryDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["history", id],
    queryFn: () => historyApi.getHistoryById(id!),
    enabled: !!id,
  });
}
