import React, { useState } from "react";
import { useAuthStore } from "../../auth/store/authStore";
import { useUpdateSchoolData } from "../hooks/useUpdateSchoolData";
import { useQueryClient } from "@tanstack/react-query";
import { SchoolCard } from "../components/SchoolCard";

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const updateMutation = useUpdateSchoolData();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // User is globally fetched in DashboardLayout, so we just use the store
  const profileData = user;

  const handleSave = (
    schoolData: { schoolName: string; className: string },
    onSuccess: () => void,
  ) => {
    updateMutation.mutate(schoolData, {
      onSuccess: () => {
        setSuccessMsg("Data sekolah berhasil diperbarui!");
        queryClient.invalidateQueries({ queryKey: ["me"] });
        onSuccess();
        setTimeout(() => setSuccessMsg(null), 3000);
      },
    });
  };

  const infoItems = [
    { icon: "person", label: "Nama Lengkap", value: profileData?.fullName },
    { icon: "email", label: "Email", value: profileData?.email },
    {
      icon: "verified",
      label: "Status Akun",
      value: profileData?.isActive ? "Aktif" : "Belum Aktif",
      badge: true,
      badgeColor: profileData?.isActive
        ? "bg-primary-container/20 text-primary"
        : "bg-tertiary-container/20 text-tertiary",
    },
  ];

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="mb-6">
        <h1 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight mb-1">
          Profil Saya
        </h1>
        <p className="text-on-surface-variant text-sm">
          Kelola informasi akun dan data sekolah Anda
        </p>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="flex items-center gap-2 bg-primary-container/15 border border-primary/20 rounded-xl px-4 py-3 mb-4 animate-[slideDown_0.3s_ease-out]">
          <span
            className="material-symbols-outlined text-primary text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <p className="text-sm font-medium text-primary flex-1">
            {successMsg}
          </p>
        </div>
      )}

      {/* Avatar & Name */}
      <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-5 border border-outline-variant/10 mb-4 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center mx-auto mb-3 shadow-lg">
          <span
            className="material-symbols-outlined text-white text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            person
          </span>
        </div>
        <h2 className="font-headline text-lg font-bold text-on-surface">
          {profileData?.fullName || "User"}
        </h2>
        <p className="text-xs text-on-surface-variant">{profileData?.email}</p>
      </div>

      {/* Info Card */}
      <div className="bg-surface-container-lowest rounded-xl clinical-shadow border border-outline-variant/10 mb-4 overflow-hidden">
        <div className="px-5 py-3 border-b border-outline-variant/10">
          <p className="text-[10px] uppercase tracking-wider text-outline font-semibold">
            Informasi Akun
          </p>
        </div>
        <div className="divide-y divide-outline-variant/10">
          {infoItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 px-5 py-3">
              <span className="material-symbols-outlined text-outline text-lg">
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                  {item.label}
                </p>
                {item.badge ? (
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mt-0.5 ${item.badgeColor}`}
                  >
                    {item.value}
                  </span>
                ) : (
                  <p className="text-sm text-on-surface font-medium truncate">
                    {item.value || "-"}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* School Data Card */}
      <SchoolCard
        initialSchoolName={profileData?.schoolName}
        initialClassName={profileData?.className}
        onSave={handleSave}
        isPending={updateMutation.isPending}
        isError={updateMutation.isError}
      />
    </div>
  );
};

export default ProfilePage;
