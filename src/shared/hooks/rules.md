Direktori src/shared/hooks ditujukan khusus untuk menyimpan Custom React Hooks yang bersifat global atau dapat digunakan ulang (reusable) di berbagai fitur/halaman yang berbeda.

Aturan utamanya dalam arsitektur berbasis fitur adalah:

Jika sebuah Hook hanya digunakan di satu fitur spesifik (misalnya useAuth atau useLogin), maka Hook tersebut harus disimpan di dalam foldernya masing-masing (contoh: src/features/auth/hooks/useAuth.ts).
Jika sebuah Hook bersifat umum dan dipakai lintas fitur, maka barulah Hook tersebut diletakkan di src/shared/hooks/.
Berikut adalah beberapa contoh file (Hooks) yang biasanya akan mengisi folder ini nantinya:

useDebounce.ts Hook untuk menunda (delay) eksekusi nilai yang sering berubah. Sangat berguna untuk fitur pencarian (search input) agar tidak memanggil API di setiap ketikan keyboard.

useLocalStorage.ts Hook umum (generic) untuk membaca dan menyimpan data secara otomatis ke localStorage browser.

useOnClickOutside.ts Hook untuk mendeteksi apabila user mengklik area di luar suatu komponen. Sering dipakai untuk menutup Dropdown, Modal, atau Drawer jika user mengklik sembarang tempat.

useWindowSize.ts / useMediaQuery.ts Hook untuk mengetahui resolusi/ukuran layar browser saat ini secara real-time (membantu membuat komponen yang sangat responsive berbasis JavaScript).

useToast.ts Hook untuk memanggil notifikasi (toast/snackbar) sukses/error dari halaman manapun di aplikasi Anda.
