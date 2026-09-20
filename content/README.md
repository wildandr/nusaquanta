# Konten Website

Data website disimpan sebagai file JSON di folder ini. **Edit file → commit → Vercel otomatis deploy (1–2 menit).** Tidak ada database, tidak ada panel admin.

## `projects.json` — daftar project portofolio

```jsonc
{
  "id": 1,                          // angka unik, dipakai di URL /project/1 — JANGAN diubah/duplikat
  "title": "Senyumin: ...",         // judul project (tampil di kartu & judul halaman)
  "slug": "senyumin",               // teks kecil di breadcrumb (bebas, unik)
  "image": "/images/home/project/1.png",  // path gambar di folder public/
  "categories": ["Healthcare"],     // label kategori (bebas; otomatis jadi opsi filter)
  "products": ["Website"],          // label jenis produk (bebas; otomatis jadi opsi filter)
  "team": [
    {
      "person": "Wildan Dzaky Ramadhani",  // HARUS sama persis dengan fullName di people.json
      "jobs": ["Frontend Developer"]       // peran orang ini di project ini
    }
  ],
  "detail": {
    "headline": "Senyumin",
    "description": "## Heading\nTeks **markdown**...",  // isi halaman detail (format markdown)
    "client": "Klien ...",
    "year": "2022"
  }
}
```

## `people.json` — anggota tim

```jsonc
{
  "id": 3,                          // angka unik; urutan tampil = urutan di file
  "fullName": "Wildan Dzaky Ramadhani",
  "description": "Deskripsi singkat...",
  "photo": "/images/project/wildan.jpeg",  // path gambar di folder public/
  "topJobs": ["UI/UX Designer", "Data Scientist"],  // maks 3, tampil di hero
  "links": {
    "github": "https://github.com/...",
    "linkedin": "https://linkedin.com/in/...",
    "instagram": "https://instagram.com/...",
    "email": "nama@email.com",
    "website": null,                // isi null kalau kosong
    "cv": "https://..."             // link CV (boleh Google Drive)
  }
}
```

## Cara menambah gambar baru

1. Upload file di GitHub: masuk folder `public/images/…` → *Add file → Upload files*
2. Salin path-nya (mis. `/images/home/project/19.png`) ke field `image` di JSON

## Aturan main

- Validasi JSON sebelum commit (mis. lewat <https://jsonlint.com>) — JSON salah = build gagal
- `id` harus unik dan tidak boleh diubah begitu sudah live (dipakai di URL)
- Nama `person` di `projects.json` harus persis sama dengan `fullName` di `people.json`
- Urutan array = urutan tampil di halaman
