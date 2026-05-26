import { useMutation, useQueryClient } from "@tanstack/react-query";
import { historyApi } from "../../../services/historyApi";
import { useState } from "react";

export function useScanMutation() {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: (file: File) =>
      historyApi.createHistory(file, (progress) => {
        setUploadProgress(progress);
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["histories"] });
      setUploadProgress(0);
    },
    onError: () => {
      setUploadProgress(0);
    },
  });

  return {
    ...mutation,
    uploadProgress,
  };
}
