import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../../../services/userApi";

export function useUpdateSchoolData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { schoolName: string; className: string }) =>
      userApi.updateSchoolData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
