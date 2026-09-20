// Harus jadi import pertama: muat env sebelum payload.config diinisialisasi.
// Catatan: Node tanpa "type":"module" tidak memuat .env.local otomatis.
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()
