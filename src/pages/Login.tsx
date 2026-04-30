import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
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
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      // Assuming backend responds with { data: { accessToken, refreshToken } } based on typical JSend format
      if (data?.data?.accessToken && data?.data?.refreshToken) {
        setTokens(data.data.accessToken, data.data.refreshToken);
        navigate("/dashboard"); // Redirect upon successful login
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
    <div className="bg-surface text-on-surface selection:bg-primary-container/30 h-screen overflow-hidden flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-4 relative overflow-hidden">
        {/* Abstract Bio-tech background elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary-container/10 blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-secondary-container/15 blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-[420px] relative z-10">
          {/* Brand Context */}
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center mb-2 shadow-md">
              <span
                className="material-symbols-outlined text-white text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                biotech
              </span>
            </div>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-1 font-semibold">
              NutriScan MBG
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Selamat Datang
            </h1>
            <p className="font-body text-on-surface-variant mt-1 text-xs">
              Deteksi Dini Risiko Pola Makan Tidak Seimbang Melalui Analisis
              Visual Makanan pada Program MBG
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-surface-container-lowest rounded-2xl clinical-shadow p-5 sm:p-6 border border-outline-variant/10">
            {loginMutation.isError && (
              <div className="mb-3 p-2 bg-error-container text-on-error-container text-xs rounded-lg">
                Login Gagal. Periksa kembali credentials Anda.
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  className="block font-label text-sm font-medium text-on-surface-variant"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-lg">
                      alternate_email
                    </span>
                  </div>
                  <input
                    {...register("email")}
                    className={`block w-full pl-10 pr-3 py-2 bg-surface-container-highest border rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 focus:border-primary/30 focus:bg-surface-container-lowest transition-all font-body text-sm shadow-sm disabled:opacity-50 ${
                      errors.email
                        ? "border-error focus:border-error focus:ring-error/40"
                        : "border-transparent"
                    }`}
                    id="email"
                    placeholder="email@gmail.com"
                    type="email"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-error mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label
                    className="block font-label text-sm font-medium text-on-surface-variant"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    className="text-xs font-semibold text-primary hover:text-primary-container transition-colors"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-lg">
                      lock
                    </span>
                  </div>
                  <input
                    {...register("password")}
                    className={`block w-full pl-10 pr-3 py-2 bg-surface-container-highest border rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 focus:border-primary/30 focus:bg-surface-container-lowest transition-all font-body text-sm shadow-sm disabled:opacity-50 ${
                      errors.password
                        ? "border-error focus:border-error focus:ring-error/40"
                        : "border-transparent"
                    }`}
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    disabled={isLoading}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-error mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <button
                className="w-full mt-2 bg-primary text-on-primary py-2.5 px-4 rounded-lg font-headline font-bold text-sm shadow-md hover:bg-surface-tint hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-outline-variant/10 text-center">
              <p className="text-sm text-on-surface-variant">
                New investigator?{" "}
                <a
                  className="text-primary font-bold hover:underline ml-1"
                  href="#"
                >
                  Register Account
                </a>
              </p>
            </div>
          </div>

          {/* Trust Indicator */}
          <div className="mt-4 flex items-center justify-center gap-5 opacity-40 grayscale contrast-125">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">
                verified_user
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                AES-256 Encrypted
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">
                security
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                ISO 27001
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
