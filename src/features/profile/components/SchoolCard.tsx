import React, { useState, useEffect } from "react";

interface SchoolCardProps {
  initialSchoolName?: string;
  initialClassName?: string;
  onSave: (
    data: { schoolName: string; className: string },
    onSuccess: () => void
  ) => void;
  isPending: boolean;
  isError: boolean;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({
  initialSchoolName = "",
  initialClassName = "",
  onSave,
  isPending,
  isError,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [schoolName, setSchoolName] = useState(initialSchoolName);
  const [className, setClassName] = useState(initialClassName);

  useEffect(() => {
    if (!isEditing) {
      setSchoolName(initialSchoolName);
      setClassName(initialClassName);
    }
  }, [initialSchoolName, initialClassName, isEditing]);

  const handleSaveClick = () => {
    if (!schoolName.trim()) return;
    onSave(
      { schoolName: schoolName.trim(), className: className.trim() },
      () => setIsEditing(false)
    );
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl clinical-shadow border border-outline-variant/10 mb-4 overflow-hidden">
      <div className="px-5 py-3 border-b border-outline-variant/10 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-wider text-outline font-semibold">
          Data Sekolah
        </p>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-primary text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-on-surface-variant">
              Nama Sekolah
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline text-lg">
                  school
                </span>
              </div>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Masukkan nama sekolah"
                className="block w-full pl-10 pr-3 py-2 bg-surface-container-highest border border-transparent rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-on-surface-variant">
              Kelas
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline text-lg">
                  groups
                </span>
              </div>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Masukkan kelas (contoh: 6A)"
                className="block w-full pl-10 pr-3 py-2 bg-surface-container-highest border border-transparent rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsEditing(false);
                setSchoolName(initialSchoolName);
                setClassName(initialClassName);
              }}
              className="flex-1 py-2.5 rounded-lg border border-outline-variant/20 text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleSaveClick}
              disabled={isPending || !schoolName.trim()}
              className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
          {isError && (
            <p className="text-xs text-error text-center">
              Gagal menyimpan. Silakan coba lagi.
            </p>
          )}
        </div>
      ) : (
        <div className="divide-y divide-outline-variant/10">
          <div className="flex items-center gap-3 px-5 py-3">
            <span className="material-symbols-outlined text-outline text-lg">
              school
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Nama Sekolah
              </p>
              <p className="text-sm text-on-surface font-medium">
                {initialSchoolName || (
                  <span className="text-outline italic">Belum diisi</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3">
            <span className="material-symbols-outlined text-outline text-lg">
              groups
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Kelas
              </p>
              <p className="text-sm text-on-surface font-medium">
                {initialClassName || (
                  <span className="text-outline italic">Belum diisi</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
