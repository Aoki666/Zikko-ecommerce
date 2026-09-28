# ZIKKO Parfume Website

## Struktur
- `index.html` — halaman utama
- `assets/css/style.css` — tampilan
- `assets/js/data.js` — 42 produk awal dari katalog lama
- `assets/js/app.js` — filter, search, WhatsApp, admin CRUD + localStorage
- `assets/img/logo-zikko.svg` — logo
- `assets/img/parfume/` — taruh foto parfum di sini

## Admin
Klik **Admin** pada menu. PIN awal: `1234`. Segera ubah dari menu Pengaturan.

## Penting sebelum publish
1. Masukkan nomor WhatsApp ZIKKO pada Admin > Pengaturan (format 628xxxx).
2. Masukkan link Instagram/TikTok/Facebook.
3. Ubah harga tiap produk. Harga awal dibuat 0 / "Harga belum diatur" karena file sumber tidak berisi harga.
4. Salin semua foto parfum lama ke `assets/img/parfume/` dengan nama file yang sama.

## Catatan admin
Versi ini adalah static website. Data admin tersimpan di `localStorage` browser, sehingga cocok untuk demo/hosting sederhana tetapi belum merupakan admin online multi-device yang aman. Untuk production, sambungkan ke Laravel + database + login server-side.
