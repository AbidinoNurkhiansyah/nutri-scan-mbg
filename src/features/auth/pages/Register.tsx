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

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .includes("@", { message: "Email harus mengandung simbol @" })
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const payload = {
        fullName: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      const response = await api.post("/auth/register", payload);
      return response.data;
    },
    onSuccess: () => {
      setShowSuccess(true);
    },
    onError: (error) => {
      console.error("Register Error:", error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  const isLoading = registerMutation.isPending;

  // Success state — show activation instructions
  if (showSuccess) {
    return (
      <AuthLayout
        title="Registrasi Berhasil!"
        subtitle="Akun Anda telah berhasil dibuat"
      >
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-4">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              mark_email_read
            </span>
          </div>
          <p className="text-on-surface-variant text-sm mb-6">
            Kami telah mengirim email aktivasi ke alamat email Anda. Silakan cek inbox dan klik link aktivasi untuk mengaktifkan akun.
          </p>
          <Button onClick={() => navigate("/login")}>
            Kembali ke Login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Daftar Akun Baru"
      subtitle="Bergabung sebagai investigator untuk program NutriScan MBG"
    >
      {registerMutation.isError && (
        <div className="mb-3 p-2 bg-error-container text-on-error-container text-xs rounded-lg">
          {(registerMutation.error as any)?.response?.data?.meta?.message ||
            "Registrasi Gagal. Silakan periksa kembali data Anda atau coba beberapa saat lagi."}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          id="name"
          label="Nama Lengkap"
          icon="person"
          type="text"
          placeholder="Masukkan Nama Kamu"
          disabled={isLoading}
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          id="email"
          label="Email Address"
          icon="alternate_email"
          type="email"
          placeholder="Masukkan email kamu"
          disabled={isLoading}
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            id="password"
            label="Password"
            icon="lock"
            type="password"
            placeholder="••••••••"
            disabled={isLoading}
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            id="confirmPassword"
            label="Konfirmasi Password"
            icon="lock_reset"
            type="password"
            placeholder="••••••••"
            disabled={isLoading}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          {isLoading ? "Creating account..." : "Buat Akun"}
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t border-outline-variant/10 text-center">
        <p className="text-sm text-on-surface-variant">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-primary font-bold hover:underline ml-1"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
