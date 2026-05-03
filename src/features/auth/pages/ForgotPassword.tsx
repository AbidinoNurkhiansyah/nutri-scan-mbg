import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .includes("@", { message: "Email harus mengandung simbol @" })
    .email("Format email tidak valid"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: ForgotPasswordFormData) => {
      const response = await api.post("/auth/forget-password", data);
      return response.data;
    },
    onSuccess: () => {
      // Navigate to OTP verification with email state
      navigate("/verify-otp", { state: { email: getValues("email") } });
    },
    onError: (error) => {
      console.error("Forgot Password Error:", error);
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data);
  };

  const isLoading = forgotPasswordMutation.isPending;

  return (
    <AuthLayout
      title="Lupa Password"
      subtitle="Masukkan email Anda untuk menerima kode OTP reset password"
    >
      {forgotPasswordMutation.isError && (
        <div className="mb-3 p-2 bg-error-container text-on-error-container text-xs rounded-lg">
          {(forgotPasswordMutation.error as any)?.response?.data?.meta?.message ||
            "Gagal mengirim OTP. Pastikan email terdaftar."}
        </div>
      )}

      {forgotPasswordMutation.isSuccess && (
        <div className="mb-3 p-2 bg-primary-container/20 text-primary text-xs rounded-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          Kode OTP telah dikirim ke email Anda. Mengalihkan ke halaman verifikasi...
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          id="email"
          label="Email Address"
          icon="alternate_email"
          type="email"
          placeholder="email@gmail.com"
          disabled={isLoading}
          error={errors.email?.message}
          {...register("email")}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          {isLoading ? "Mengirim OTP..." : "Kirim Kode OTP"}
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t border-outline-variant/10 text-center">
        <p className="text-sm text-on-surface-variant">
          Ingat password?{" "}
          <Link
            to="/login"
            className="text-primary font-bold hover:underline ml-1"
          >
            Kembali ke Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
