import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../../../services/api";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";

const changePasswordSchema = z
  .object({
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = (location.state as { email?: string; code?: string }) || {};

  // Redirect if no email or code in state
  useEffect(() => {
    if (!email || !code) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, code, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: ChangePasswordFormData) => {
      const payload = {
        email,
        code,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      const response = await api.post("/auth/change-password", payload);
      return response.data;
    },
    onSuccess: () => {
      // Will show success state, then user clicks to go to login
    },
    onError: (error) => {
      console.error("Change Password Error:", error);
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePasswordMutation.mutate(data);
  };

  const isLoading = changePasswordMutation.isPending;

  if (!email || !code) return null;

  // Success state
  if (changePasswordMutation.isSuccess) {
    return (
      <AuthLayout
        title="Password Berhasil Diubah"
        subtitle="Keamanan akun Anda telah diperbarui"
      >
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-4">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock_reset
            </span>
          </div>
          <p className="text-on-surface-variant text-sm mb-6">
            Password Anda berhasil diubah. Silakan login menggunakan password baru Anda.
          </p>
          <Button onClick={() => navigate("/login")}>
            Lanjut ke Login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Buat Password Baru"
      subtitle="Masukkan password baru untuk akun Anda"
    >
      {changePasswordMutation.isError && (
        <div className="mb-3 p-2 bg-error-container text-on-error-container text-xs rounded-lg">
          {(changePasswordMutation.error as any)?.response?.data?.meta?.message ||
            "Gagal mengubah password. OTP mungkin sudah kedaluwarsa."}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          id="password"
          label="Password Baru"
          icon="lock"
          type="password"
          placeholder="Minimal 6 karakter"
          disabled={isLoading}
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          id="confirmPassword"
          label="Konfirmasi Password Baru"
          icon="lock_reset"
          type="password"
          placeholder="Ulangi password baru"
          disabled={isLoading}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          {isLoading ? "Mengubah Password..." : "Ubah Password"}
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t border-outline-variant/10 text-center">
        <p className="text-sm text-on-surface-variant">
          <Link
            to="/login"
            className="text-primary font-bold hover:underline"
          >
            Kembali ke Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ChangePassword;
