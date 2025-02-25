Cara Mengatur Database:
1.	Instalasi MySQL2
Instal paket mysql2 melalui terminal dengan perintah: npm install mysql2
2.	Membuat Database
o	Buka localhost/phpmyadmin.
o	Buat database baru
3.	Membuat Tabel
o	Buat tabel melalui SQL untuk menyimpan data pengguna dan tugas.
o	Struktur tabel:
	Tabel user: terdiri dari kolom uid, username, dan password.
	Tabel tasks: terdiri dari kolom id, user_id, title, category, deadline, dan status.
o	Setelah eksekusi SQL, tabel akan berhasil dibuat.
4.	Menghubungkan Database ke Proyek
o	Buka VS Code dan akses file .env.
o	Deklarasikan koneksi database pada file yang memerlukannya, seperti db.js dan userModel.js.
5.	Pengetesan Koneksi Database
o	Gunakan Postman untuk menguji koneksi dengan metode GET, POST, PUT, DELETE.
________________________________________
Cara Menjalankan Proyek Secara Lokal:
1.	Menjalankan Server
o	Buka terminal dan jalankan perintah: npm start
o	Jika muncul pesan "Server running at http://localhost:3000", berarti server berhasil dijalankan.
2.	Mengakses Aplikasi
o	Buka http://localhost:3000 di browser.
o	Frontend akan otomatis terhubung dengan backend.
________________________________________
Fitur Utama yang Telah Diimplementasikan:
1.	Fitur Register dan Login
Pengguna baru harus melakukan registrasi sebelum bisa login.
Pengguna yang sudah terdaftar dapat langsung login dengan autentikasi JWT.
Password yang disimpan dalam database akan di-hash menggunakan bcrypt untuk keamanan.
2.	Fitur Tambah Tugas 
o	Pengguna dapat menambahkan tugas dengan mengisi judul, kategori, dan deadline.
o	Tugas yang ditambahkan akan masuk ke daftar dengan status belum selesai.
3.	Fitur Edit Tugas
o	Pengguna dapat mengubah judul, kategori, dan deadline, status tugas yang sudah dibuat.
4.	Fitur Hapus Tugas 
o	Pengguna dapat menghapus tugas dari daftar yang tersedia.
5.	Fitur Filter Berdasarkan Kategori
o	Tugas dapat difilter berdasarkan kategori kuliah, organisasi, atau pribadi.
o	Hasil filter akan langsung muncul tanpa perlu me-reload halaman.