import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../../../shared/components/ui/Button";
import { userApi } from "../../../services/userApi";
import { useAuthStore } from "../store/authStore";

const setupSchema = z.object({
  schoolName: z.string().min(2, "Nama sekolah harus diisi"),
  className: z.string().min(1, "Pilih kelas"),
});

type SetupFormData = z.infer<typeof setupSchema>;

const SetupProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
    mode: "onChange",
    defaultValues: {
      schoolName: user?.schoolName || "",
      className: user?.className || "",
    },
  });

  const setupMutation = useMutation({
    mutationFn: async (data: SetupFormData) => {
      return await userApi.updateSchoolData(data);
    },
    onSuccess: (response, variables) => {
      const newSchoolName = response.data?.schoolName || response.schoolName || variables.schoolName;
      const newClassName = response.data?.className || response.className || variables.className;

      // Optimistically update the cache so DashboardLayout gets the fresh data instantly
      queryClient.setQueryData(["me"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            schoolName: newSchoolName,
            className: newClassName,
          },
        };
      });

      // Update local store with new data
      if (user) {
        setUser({
          ...user,
          schoolName: newSchoolName,
          className: newClassName,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.error("Setup Profile Error:", error);
    },
  });

  const onSubmit = (data: SetupFormData) => {
    setupMutation.mutate(data);
  };

  const isLoading = setupMutation.isPending;

  return (
    <AuthLayout
      title="Lengkapi Profil"
      subtitle="Isi data sekolah dan kelas untuk melanjutkan"
    >
      {setupMutation.isError && (
        <div className="mb-3 p-2 bg-error-container text-on-error-container text-xs rounded-lg">
           {(setupMutation.error as any)?.response?.data?.meta?.message ||
            "Gagal menyimpan data. Silakan coba lagi."}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="schoolName" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wider">
            Nama Sekolah
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">school</span>
            </div>
            <input
              id="schoolName"
              type="text"
              autoComplete="off"
              placeholder="Masukkan nama sekolah"
              disabled={isLoading}
              className={`w-full bg-surface-container-highest border ${
                errors.schoolName ? "border-error" : "border-outline-variant/30"
              } rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              {...register("schoolName")}
            />
          </div>
          {errors.schoolName && (
            <p className="mt-1 text-xs text-error font-medium">{errors.schoolName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="className" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wider">
            Kelas
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">meeting_room</span>
            </div>
            <select
              id="className"
              disabled={isLoading}
              className={`w-full bg-surface-container-highest border ${
                errors.className ? "border-error" : "border-outline-variant/30"
              } rounded-xl py-2.5 pl-10 pr-4 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer`}
              {...register("className")}
            >
              <option value="" disabled>Pilih Kelas</option>
              <option value="Kelas 1">Kelas 1</option>
              <option value="Kelas 2">Kelas 2</option>
              <option value="Kelas 3">Kelas 3</option>
              <option value="Kelas 4">Kelas 4</option>
              <option value="Kelas 5">Kelas 5</option>
              <option value="Kelas 6">Kelas 6</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">expand_more</span>
            </div>
          </div>
          {errors.className && (
            <p className="mt-1 text-xs text-error font-medium">{errors.className.message}</p>
          )}
        </div>

        <Button type="submit" className="mt-6 w-full" isLoading={isLoading}>
          {isLoading ? "Menyimpan..." : "Simpan & Lanjutkan"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SetupProfilePage;
