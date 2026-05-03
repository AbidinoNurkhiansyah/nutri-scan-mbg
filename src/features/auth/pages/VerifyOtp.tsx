import React, { useRef, useState, useEffect } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../../../services/api";
import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../../../shared/components/ui/Button";

const OTP_LENGTH = 6;

const verifyOtpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(OTP_LENGTH, "Kode OTP harus 6 digit"),
});

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email;

  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: { email: string; code: string }) => {
      const parsed = verifyOtpSchema.parse(data);
      const response = await api.post("/auth/verify-otp", parsed);
      return response.data;
    },
    onSuccess: () => {
      navigate("/change-password", {
        state: { email, code: otp.join("") },
      });
    },
    onError: (error) => {
      console.error("Verify OTP Error:", error);
      // Clear OTP on error
      setOtp(new Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    },
  });

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (pasted.length === 0) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((v) => !v);
    inputRefs.current[nextEmptyIndex === -1 ? OTP_LENGTH - 1 : nextEmptyIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== OTP_LENGTH || !email) return;
    verifyOtpMutation.mutate({ email, code });
  };

  const isComplete = otp.every((digit) => digit !== "");
  const isLoading = verifyOtpMutation.isPending;

  if (!email) return null;

  return (
    <AuthLayout
      title="Verifikasi OTP"
      subtitle={`Masukkan 6 digit kode yang dikirim ke ${email}`}
    >
      {verifyOtpMutation.isError && (
        <div className="mb-3 p-2 bg-error-container text-on-error-container text-xs rounded-lg">
          {(verifyOtpMutation.error as any)?.response?.data?.meta?.message ||
            "Kode OTP tidak valid atau sudah kedaluwarsa."}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-2.5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isLoading}
              className={`w-11 h-13 text-center text-lg font-bold rounded-lg border bg-surface-container-highest text-on-surface focus:ring-2 focus:ring-primary/40 focus:border-primary/30 focus:bg-surface-container-lowest transition-all disabled:opacity-50 ${
                digit
                  ? "border-primary/30 bg-primary-container/5"
                  : "border-transparent"
              }`}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Timer & Resend */}
        <div className="text-center">
          <p className="text-xs text-on-surface-variant">
            Kode berlaku selama 5 menit
          </p>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!isComplete}
        >
          {isLoading ? "Memverifikasi..." : "Verifikasi Kode"}
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t border-outline-variant/10 text-center">
        <p className="text-sm text-on-surface-variant">
          Tidak menerima kode?{" "}
          <Link
            to="/forgot-password"
            className="text-primary font-bold hover:underline ml-1"
          >
            Kirim Ulang
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
