import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

// Sesuaikan path import ini ke lokasi service claim di gateway atau service kamu
import { createClaim } from "../../api_gateway/src/services/claimServices.js"; 
import pkg from 'pg';
const { Pool } = pkg;

// Buka koneksi langsung ke database untuk menimpa tanggal
const pool = new Pool({
  user: 'dev_adhi',
  host: 'localhost',
  database: 'claim_simanajemenkehilanganbarang_db', // Asumsi DB yang sama, sesuaikan jika beda
  password: 'Jakarta191004',
  port: 5432,
});

const USER_ADHI = 'user-w1noxry7I1fv2zoV';
const NAME_ADHI = 'Adhi Nur Ramadan';
const USER_NISA = 'user-U8uNDdcgyP-ifMhT';
const NAME_NISA = 'Nisa Nurlaila, M.Pd.';

const dataToSeed = [
  // --- KELOMPOK 1: HARI INI (16 Juni 2026) ---
  {
    report_id: 'report-found-005', // Nisa menemukan Tumbler
    user_id: USER_ADHI, 
    claim_type: 'claim', // Adhi mengklaim tumbler tersebut
    reporter_name: NAME_ADHI, 
    reporter_role: 'Mahasiswa',
    location: 'Ruang Dosen', 
    contact_phone: '087832282111',
    description: 'Itu tumbler saya Bu, warna biru ada stiker panda di bawahnya.', 
    image_url: 'https://example.com/images/bukti_tumbler.jpg',
    message: 'Maaf Ibu, tumbler saya tertinggal setelah bimbingan tadi pagi.', 
    status: 'pending',
    created_at: '2026-06-16T15:00:00Z',
    updated_at: '2026-06-16T15:00:00Z'
  },
  {
    report_id: 'report-lost-006', // Adhi kehilangan TWS
    user_id: USER_NISA, 
    claim_type: 'report', // Nisa melaporkan menemukan TWS itu
    reporter_name: NAME_NISA, 
    reporter_role: 'Dosen',
    location: 'Ruang Seminar', 
    contact_phone: '085223344556',
    description: 'Saya temukan TWS putih ini di kursi barisan ketiga.', 
    image_url: 'https://example.com/images/bukti_tws_ketemu.jpg',
    message: 'Silakan ambil di meja saya di ruang dosen ya.', 
    status: 'pending',
    created_at: '2026-06-16T11:00:00Z',
    updated_at: '2026-06-16T11:00:00Z'
  },

  // --- KELOMPOK 2: 3 HARI YANG LALU (14 - 15 Juni 2026) ---
  {
    report_id: 'report-found-009', // Nisa menemukan KTM Adhi
    user_id: USER_ADHI, 
    claim_type: 'claim', 
    reporter_name: NAME_ADHI, 
    reporter_role: 'Mahasiswa',
    location: 'Perpustakaan Pusat', 
    contact_phone: '087832282111',
    description: 'Itu KTM saya atas nama Adhi Nur Ramadan.', 
    image_url: 'https://example.com/images/ktp_adhi.jpg', // Bukti KTP
    message: 'Terima kasih sudah diamankan Bu.', 
    status: 'accepted', // Simulasi sudah diterima/selesai
    created_at: '2026-06-15T13:00:00Z',
    updated_at: '2026-06-15T14:30:00Z'
  },
  {
    report_id: 'report-lost-010', // Adhi kehilangan Charger
    user_id: USER_NISA, 
    claim_type: 'report', 
    reporter_name: NAME_NISA, 
    reporter_role: 'Dosen',
    location: 'Kantin Teknik', 
    contact_phone: '085223344556',
    description: 'Charger ASUS warna hitam, ada bekas solasi.', 
    image_url: 'https://example.com/images/charger_ketemu.jpg',
    message: 'Saya titipkan di satpam fakultas teknik ya.', 
    status: 'pending',
    created_at: '2026-06-14T15:00:00Z',
    updated_at: '2026-06-14T15:00:00Z'
  },

  // --- KELOMPOK 3: 1 MINGGU YANG LALU (10 - 13 Juni 2026) ---
  {
    report_id: 'report-found-015', // Nisa menemukan Mouse
    user_id: USER_ADHI, 
    claim_type: 'claim', 
    reporter_name: NAME_ADHI, 
    reporter_role: 'Mahasiswa',
    location: 'Perpustakaan Lantai 2', 
    contact_phone: '087832282111',
    description: 'Mouse logitech M220 warna abu, baterainya merk alkaline.', 
    image_url: 'https://example.com/images/dus_mouse.jpg', // Bukti dus
    message: 'Saya bisa ambil ke ruangan ibu kapan ya?', 
    status: 'accepted',
    created_at: '2026-06-10T16:00:00Z',
    updated_at: '2026-06-11T09:00:00Z'
  },

  // --- KELOMPOK 4: DATA LAMA & DITOLAK ---
  {
    report_id: 'report-lost-020', // Adhi kehilangan Kalkulator
    user_id: USER_NISA, 
    claim_type: 'report', 
    reporter_name: NAME_NISA, 
    reporter_role: 'Dosen',
    location: 'Ruang Ujian 401', 
    contact_phone: '085223344556',
    description: 'Kalkulator Casio hitam, tapi bukan seri EX.', 
    image_url: 'https://example.com/images/kalkulator_beda.jpg',
    message: 'Apakah ini punya kamu?', 
    status: 'rejected', // Ditolak karena beda tipe
    created_at: '2026-05-28T14:00:00Z',
    updated_at: '2026-05-28T15:30:00Z'
  }
];

const runSeeder = async () => {
  console.log('🌱 Mulai melakukan seeding data claim...');

  try {
    // 1. Bersihkan database terlebih dahulu agar tidak duplikat
    await pool.query('DELETE FROM claims;');
    console.log('🧹 Database claims dibersihkan.');

    for (const claim of dataToSeed) {
      // 2. Buat data menggunakan fungsi service
      const result = await createClaim(claim);
      
      // Ambil ID yang dihasilkan oleh nanoid
      const generatedId = result.id; 

      // 3. INI KUNCINYA: Timpa tanggalnya secara paksa menggunakan Query SQL
      if (claim.created_at || claim.updated_at) {
        await pool.query(
          'UPDATE claims SET created_at = $1, updated_at = $2, status = $3 WHERE id = $4',
          [claim.created_at, claim.updated_at, claim.status, generatedId]
        );
      }

      console.log(`✅ Claim [${claim.claim_type.toUpperCase()}] untuk Report ${claim.report_id} berhasil dimanipulasi tanggalnya!`);
    }

    console.log(`🎉 Berhasil memasukkan ${dataToSeed.length} data klaim baru dengan tanggal bervariasi!`);
    process.exit(0); 
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat seeding claim:', error);
    process.exit(1); 
  }
};

runSeeder();