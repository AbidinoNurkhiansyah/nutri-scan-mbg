<div align="center">
<picture>
  <source srcset="https://i.ibb.co.com/gQyBLRQ/Whats-App-Image-2026-05-31-at-14-47-35.jpg">
  <img alt="NutriScan Logo" height="150" >
</picture>
</div>

<img src="https://github.com/user-attachments/assets/d37a62f7-650a-4886-81c9-d3809d3ddeed" width="100%" height="2px"/>
<p/>

Platform cerdas berbasis AI yang membantu memindai dan menganalisis kandungan nutrisi makanan secara instan untuk program Makan Bergizi Gratis (MBG).

## Tentang

**NutriScan MBG** menggunakan teknologi _Computer Vision_ dan _Machine Learning_ untuk memberikan analisis gizi makanan harian. Cukup dengan mengambil foto makanan, sistem akan menganalisis kecocokannya dengan standar kesehatan, memberikan skor nutrisi, serta memvisualisasikannya ke dalam grafik komparasi secara real-time.

Proyek ini dibangun menggunakan modern frontend web technologies untuk memastikan antarmuka yang responsif, cepat, dan mudah digunakan pada perangkat mobile maupun desktop.

**Capstone Project** Coding Camp 2026 oleh Dicoding × DBS Foundation (Tim PSU037)

## Fitur

- **Autentikasi Aman** → Login, Register, verifikasi OTP, penggantian sandi, hingga pengaturan profil sekolah.
- **Pemindai Makanan (Scan)** → Deteksi instan menggunakan kamera perangkat atau fitur unggah gambar dengan UI perbandingan.
- **Analisis AI** → Prediksi dan perhitungan kandungan gizi makanan (Kalori, Protein, Karbohidrat, Lemak) yang diproses AI.
- **Visualisasi Nutrisi** → Grafik (_Radar/Bar Chart_) komponen nutrisi menggunakan Chart.js serta indikator skor kualitas makanan.
- **Riwayat Scan** → Penyimpanan dan pantauan riwayat pindaian makanan dan hasil analisis gizi pada hari-hari sebelumnya.
- **Dashboard Interaktif** → Ringkasan statistik kesehatan dan riwayat ringkas melalui dashboard utama.
- **Desain Responsif** → Pengalaman pengguna yang dioptimalkan baik untuk mobile maupun layar yang lebih besar.

## Tech Stack

| Layer      | Teknologi                     |
| ---------- | ----------------------------- |
| Framework  | React 19, Vite, TypeScript    |
| UI/Styling | Tailwind CSS v4               |
| State Mgt  | Zustand, Tanstack React Query |
| Form/Valid | React Hook Form, Zod          |
| Charts     | Chart.js (react-chartjs-2)    |
| Routing    | React Router DOM v7           |
| API Client | Axios                         |

## Memulai

### Prasyarat

- Node.js 18+ (direkomendasikan Node.js 20+)
- npm / yarn / pnpm

### Instalasi

```bash
git clone <URL_REPO_FE_NUTRISCAN>
cd fe-nutri-scan-mbg
npm install
```

### Environment Variables

Buat file `.env` di root folder proyek:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Ganti dengan URL server API backend jika menjalankan environment production.

### Development

```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser Anda.

> **Catatan:** Frontend membutuhkan backend server dan service AI yang berjalan agar fitur otentikasi, riwayat, dan analisis scan dapat bekerja dengan baik.

### Build & Preview

```bash
npm run build
npm run preview
```

## Struktur Project

```text
├── public/                 # Aset statis
├── src/
│   ├── app/                # Konfigurasi Providers dan Router
│   ├── assets/             # Gambar pendukung
│   ├── features/           # Modul fungsionalitas (Feature-sliced design)
│   │   ├── auth/           # Login, Register, OTP, Profil
│   │   ├── dashboard/      # Layout dashboard, statistik umum
│   │   ├── history/        # Daftar histori pindaian
│   │   ├── profile/        # Komponen pengaturan pengguna/sekolah
│   │   ├── scan/           # Kamera, perbandingan gambar, Chart Nutrisi
│   │   └── stats/          # Kalkulator dan visualisasi statistik
│   ├── services/           # Axios client dan API endpoints
│   └── shared/             # Komponen UI Reusable, Hooks global
```

## Halaman / Routes Utama

| Halaman      | Path                  | Deskripsi                                          |
| ------------ | --------------------- | -------------------------------------------------- |
| Login / Auth | `/auth/login`         | Halaman otentikasi, sign-up, dan reset sandi       |
| Setup Profil | `/auth/setup-profile` | Pengisian data profil bagi _user_ baru             |
| Dashboard    | `/dashboard`          | Statistik utama dan navigasi kegiatan MBG          |
| Scan Makanan | `/scan`               | Antarmuka kamera untuk pemindaian foto makanan     |
| Hasil Scan   | `/scan/result`        | Detail nutrisi hasil AI & grafik laporan.          |
| Riwayat      | `/history`            | Kumpulan histori data makanan yang pernah dipindai |
| Data Profil  | `/profile`            | Pengaturan profil pengguna dan opsi keluar         |
| Statistik    | `/stats`              | Rangkuman asupan gizi harian/mingguan terpantau    |

## Tim Pengembang

| ID             | Nama                     | Peran                    |
| -------------- | ------------------------ | ------------------------ |
| CACC227D6Y0478 | Aditya Dwi Ferdiansyah   | AI Engineer              |
| CACC227D6Y0534 | Arie Akbarull Ridho      | AI Engineer              |
| CDCC227D6Y2104 | Muhammad Iqbal Nur Hakim | Data Scientist           |
| CDCC282D6Y2105 | Ilham Sanusi             | Data Scientist           |
| CFCC282D6Y1149 | Rafid Hilmi              | Full-Stack Web Developer |
| CFCC882D6Y2115 | Abidino Nurkhiansyah     | Full-Stack Web Developer |

## Tautan Repositori Terkait

Aplikasi frontend ini terhubung dengan arsitektur sistem yang saling bekerja sama. Silakan kunjungi repositori lain pada ekosistem proyek ini:

| Layer                            | URL / Repositori                                                          |
| -------------------------------- | ------------------------------------------------------------------------- |
| **Backend (BE)**                 | [Tautan Repositori BE](https://github.com/RazorPG/be-nutri-scan-mbg)      |
| **Artificial Intelligence (AI)** | [Tautan Repositori AI](https://github.com/ariear/nutriscan-mbg-ai)        |
| **Data Science (DS)**            | [Tautan Repositori DS](https://github.com/iqbalmuhammad08f/NutriScan-MBG) |

## Lisensi

Proyek ini dikembangkan sebagai bagian dari program Coding Camp 2026 (Dicoding × DBS Foundation).
