import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../../services/api";
import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../../../shared/components/ui/Button";

const Activation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error" | "no-token">("loading");
  const hasActivated = useRef(false);

  const activationMutation = useMutation({
    mutationFn: async (activationToken: string) => {
      const response = await api.post("/auth/activation", { token: activationToken });
      return response.data;
    },
    onSuccess: () => {
      setStatus("success");
    },
    onError: () => {
      setStatus("error");
    },
  });

  useEffect(() => {
    if (!token) {
      setStatus("no-token");
      return;
    }
    if (hasActivated.current) return;
    hasActivated.current = true;
    activationMutation.mutate(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="material-symbols-outlined text-primary text-2xl">hourglass_top</span>
            </div>
            <p className="text-on-surface-variant text-sm">Mengaktifkan akun Anda...</p>
          </div>
        );

      case "success":
        return (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-4">
              <span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <h2 className="font-headline text-lg font-bold text-on-surface mb-2">
              Akun Berhasil Diaktifkan!
            </h2>
            <p className="text-on-surface-variant text-sm mb-6">
              Akun Anda telah aktif. Silakan login untuk mulai menggunakan NutriScan MBG.
            </p>
            <Button onClick={() => navigate("/login")}>
              Lanjut ke Login
            </Button>
          </div>
        );

      case "error":
        return (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-error-container/20 flex items-center justify-center mx-auto mb-4">
              <span
                className="material-symbols-outlined text-error text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                error
              </span>
            </div>
            <h2 className="font-headline text-lg font-bold text-on-surface mb-2">
              Aktivasi Gagal
            </h2>
            <p className="text-on-surface-variant text-sm mb-6">
              Token aktivasi tidak valid atau sudah pernah digunakan. Silakan hubungi admin atau coba register ulang.
            </p>
            <Link
              to="/register"
              className="text-primary font-bold hover:underline text-sm"
            >
              Kembali ke Register
            </Link>
          </div>
        );

      case "no-token":
        return (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-error-container/20 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-error text-3xl">link_off</span>
            </div>
            <h2 className="font-headline text-lg font-bold text-on-surface mb-2">
              Token Tidak Ditemukan
            </h2>
            <p className="text-on-surface-variant text-sm mb-6">
              Link aktivasi tidak valid. Pastikan Anda menggunakan link dari email yang dikirimkan saat registrasi.
            </p>
            <Link
              to="/login"
              className="text-primary font-bold hover:underline text-sm"
            >
              Kembali ke Login
            </Link>
          </div>
        );
    }
  };

  return (
    <AuthLayout
      title="Aktivasi Akun"
      subtitle="Verifikasi akun NutriScan MBG Anda"
    >
      {renderContent()}
    </AuthLayout>
  );
};

export default Activation;
