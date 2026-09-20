# Website PT Nusa Quanta Indonesia

Company profile & portofolio. Dibangun dengan [Next.js 15](https://nextjs.org) + React 19 + Tailwind CSS. Satu repo, satu deploy di [Vercel](https://vercel.com).

**Live:** https://nusaquanta.tech

## Struktur

```
content/            ← DATA website (JSON) — edit di sini
├── projects.json   daftar project portofolio
├── people.json     anggota tim
└── README.md       panduan skema & cara edit data
public/             ← gambar & video statis
src/app/            ← routing halaman (/, /project, /project/[id])
layouts/            ← komponen UI (components/, partials/, elements/)
src/lib/queries.ts  ← pembaca data JSON untuk halaman
config/config.json  ← metadata SEO (title, description)
```

## Edit konten

Semua data (project, tim) di-edit lewat file JSON di `content/` — langsung di GitHub:
edit → commit → Vercel auto-deploy (±1–2 menit) → live.

Skema lengkap & contoh: lihat [content/README.md](content/README.md).

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # cek build production
```

Node >= 20. Tidak perlu env var / database / akun eksternal apa pun.

## Deploy

Otomatis dari GitHub: setiap push/merge ke `main` → Vercel deploy.
Domain & DNS dikelola di dashboard Vercel + registrar domain.
