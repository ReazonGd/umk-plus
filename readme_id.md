# UMK+

UMK+ adalah Chrome browser Extension berfokus untuk mahasiswa UMK (Universitas Muria Kudus). dimana, harapanya mempermudah kegiatan yang dilakukan di aplikasi umk seperti sunan. Dibuat menggunakan TypeScript, Webpack, and Preact.

### Bahasa

- [Inggris](./readme.md)
- Indonesian

# Instalasi

Saat ini UMK+ hanya di coba menggunakan chrome browser saja.

## Instalasi dengan crx file

- Pergi ke halaman rilis. [disini](https://github.com/ReazonGd/umk-plus/releases).
- Download file umk-plus-x.x.x.crx
- Pergi ke Kelola Extensi [chrome://extensions/](chrome://extensions/)
- Aktifkan developer mode di kanan atas.
- [Seret dan lepas](https://id.wikipedia.org/wiki/Seret_dan_lepas) file extensi ke halaman.

## Instalasi dengan zip

-Pergi ke halaman rilis. [disini](https://github.com/ReazonGd/umk-plus/releases).

- Download file umk-plus-x.x.x.crx
- Extrak file zip
- Pergi ke Kelola Extensi [chrome://extensions/](chrome://extensions/)
- Aktifkan developer mode di kanan atas.
- klik "Load Unpacked" di kiri atas
- Arahkan ke folder yang telah diesktrak.

## Build Installation

Clone repository ini

```sh
git clone https://github.com/ReazonGd/umk-plus
```

Install packages lalu build

```sh
npm i && npm run build
```

Setelah proses pembuatan selesai, file yang siap digunakan akan disalin ke `./release/umk-plus-x.x.x`. Buka Manajer ekstensi [chrome://extensions/](chrome://extensions/), aktifkan mode pengembang, klik tombol "Load Unpacked", dan navigasikan ke direktori rilis.

# Disklaimer

    Proyek ini tidak berafiliasi dengan organisasi mana pun. Resiko ditanggung sendiri.
