import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";
import { useAuthStore } from "../store/authStore";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").includes("@", { message: "Email harus mengandung simbol @" }).email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.data?.accessToken && data?.data?.refreshToken) {
        setTokens(data.data.accessToken, data.data.refreshToken);
        navigate("/dashboard", { replace: true, state: { loginSuccess: true } });
      }
    },
    onError: (error) => {
      console.error("Login Error:", error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const isLoading = loginMutation.isPending;

  return (
    <AuthLayout
      title="Selamat Datang"
      subtitle="Deteksi Dini Risiko Pola Makan Tidak Seimbang Melalui Analisis Visual Makanan pada Program MBG"
    >
      {loginMutation.isError && (
        <div className="mb-3 p-2 bg-error-container text-on-error-container text-xs rounded-lg">
          {(loginMutation.error as any)?.response?.data?.meta?.message ||
            "Login Gagal. Periksa kembali credentials Anda."}
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

        <Input
          id="password"
          label="Password"
          icon="lock"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
          error={errors.password?.message}
          rightElement={
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-primary hover:text-primary-container transition-colors"
            >
              Forgot Password?
            </Link>
          }
          {...register("password")}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t border-outline-variant/10 text-center">
        <p className="text-sm text-on-surface-variant">
          New investigator?{" "}
          <Link
            to="/register"
            className="text-primary font-bold hover:underline ml-1"
          >
            Register Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
