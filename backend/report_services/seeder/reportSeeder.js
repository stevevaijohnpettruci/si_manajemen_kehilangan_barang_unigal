import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { createReport } from '../../api_gateway/src/services/reportServices.js';
import pkg from 'pg';
const { Pool } = pkg;

// Buka koneksi langsung ke database untuk menimpa tanggal
const pool = new Pool({
  user: 'dev_adhi',
  host: 'localhost',
  database: 'report_simanajemenkehilanganbarang_db',
  password: 'Jakarta191004',
  port: 5432,
});

const USER_ADHI = 'user-w1noxry7I1fv2zoV';
const NAME_ADHI = 'Adhi Nur Ramadan';

const USER_NISA = 'user-U8uNDdcgyP-ifMhT';
const NAME_NISA = 'Nisa Nurlaila, M.Pd.';

const USER_BUDI = 'user-budi123abc';
const NAME_BUDI = 'Budi Santoso';

const USER_SITI = 'user-siti456def';
const NAME_SITI = 'Siti Rahmawati';

const USER_FAJAR = 'user-fajar789ghi';
const NAME_FAJAR = 'Fajar Nugraha';

const USERS = [
  { id: USER_ADHI, fullname: NAME_ADHI, phone: '087832282111' },
  { id: USER_NISA, fullname: NAME_NISA, phone: '085223344556' },
  { id: USER_BUDI, fullname: NAME_BUDI, phone: '081234567890' },
  { id: USER_SITI, fullname: NAME_SITI, phone: '082112223333' },
  { id: USER_FAJAR, fullname: NAME_FAJAR, phone: '083812345678' },
];

const dataToSeed = [
  // HARI INI
  {
    id: 'report-001',
    user_id: USER_ADHI,
    user_fullname: NAME_ADHI,
    item_name: 'Flashdisk Sandisk 64GB',
    description: 'Warna merah hitam.',
    category: 'lost',
    image_url: null,
    location_lost: 'Lab Komputer Dasar',
    date_lost: '2026-06-16T08:00:00Z',
    status: 'unclaimed',
    contact_phone: '087832282111',
    created_at: '2026-06-16T09:00:00Z',
  },
  {
    id: 'report-002',
    user_id: USER_NISA,
    user_fullname: NAME_NISA,
    item_name: 'Tumbler Miniso Biru',
    description: 'Botol minum 700ml.',
    category: 'found',
    image_url: null,
    location_lost: 'Ruang Dosen',
    status: 'unclaimed',
    contact_phone: '085223344556',
    date_lost: '2026-06-16T10:00:00Z',
    created_at: '2026-06-16T10:30:00Z',
  },
  {
    id: 'report-003',
    user_id: USER_BUDI,
    user_fullname: NAME_BUDI,
    item_name: 'Dompet Kulit Hitam',
    description: 'Berisi SIM dan KTP.',
    category: 'lost',
    image_url: null,
    location_lost: 'Kantin Pusat',
    status: 'unclaimed',
    contact_phone: '081234567890',
    date_lost: '2026-06-16T11:00:00Z',
    created_at: '2026-06-16T11:20:00Z',
  },
  {
    id: 'report-004',
    user_id: USER_SITI,
    user_fullname: NAME_SITI,
    item_name: 'Payung Lipat Pink',
    description: 'Payung kecil warna pink.',
    category: 'found',
    image_url: null,
    location_lost: 'Gedung B',
    status: 'claimed',
    contact_phone: '082112223333',
    date_lost: '2026-06-16T12:00:00Z',
    created_at: '2026-06-16T12:15:00Z',
  },
  {
    id: 'report-005',
    user_id: USER_FAJAR,
    user_fullname: NAME_FAJAR,
    item_name: 'Kunci Motor Honda',
    description: 'Dengan gantungan bola basket.',
    category: 'lost',
    image_url: null,
    location_lost: 'Parkiran Timur',
    status: 'unclaimed',
    contact_phone: '083812345678',
    date_lost: '2026-06-16T13:00:00Z',
    created_at: '2026-06-16T13:30:00Z',
  },

  // 1-3 HARI LALU
  {
    id: 'report-006',
    user_id: USER_ADHI,
    user_fullname: NAME_ADHI,
    item_name: 'Charger Laptop ASUS',
    description: 'Adaptor hitam.',
    category: 'lost',
    image_url: null,
    location_lost: 'Perpustakaan',
    status: 'unclaimed',
    contact_phone: '087832282111',
    date_lost: '2026-06-15T08:00:00Z',
    created_at: '2026-06-15T10:00:00Z',
  },
  {
    id: 'report-007',
    user_id: USER_BUDI,
    user_fullname: NAME_BUDI,
    item_name: 'Mouse Logitech M331',
    description: 'Warna abu-abu.',
    category: 'found',
    image_url: null,
    location_lost: 'Lab Multimedia',
    status: 'claimed',
    contact_phone: '081234567890',
    date_lost: '2026-06-15T09:00:00Z',
    created_at: '2026-06-15T09:30:00Z',
  },
  {
    id: 'report-008',
    user_id: USER_SITI,
    user_fullname: NAME_SITI,
    item_name: 'Kartu ATM BCA',
    description: 'Atas nama Rahmawati.',
    category: 'found',
    image_url: null,
    location_lost: 'ATM Center',
    status: 'unclaimed',
    contact_phone: '082112223333',
    date_lost: '2026-06-15T13:00:00Z',
    created_at: '2026-06-15T14:00:00Z',
  },
  {
    id: 'report-009',
    user_id: USER_FAJAR,
    user_fullname: NAME_FAJAR,
    item_name: 'Jaket Hoodie Abu-Abu',
    description: 'Ukuran L.',
    category: 'lost',
    image_url: null,
    location_lost: 'Aula Kampus',
    status: 'unclaimed',
    contact_phone: '083812345678',
    date_lost: '2026-06-14T15:00:00Z',
    created_at: '2026-06-14T16:00:00Z',
  },

  // 1 MINGGU
  {
    id: 'report-010',
    user_id: USER_NISA,
    user_fullname: NAME_NISA,
    item_name: 'KTM Mahasiswa',
    description: 'Ditemukan di meja baca.',
    category: 'found',
    image_url: null,
    location_lost: 'Perpustakaan Lantai 2',
    status: 'unclaimed',
    contact_phone: '085223344556',
    date_lost: '2026-06-12T10:00:00Z',
    created_at: '2026-06-12T11:00:00Z',
  },
  {
    id: 'report-011',
    user_id: USER_BUDI,
    user_fullname: NAME_BUDI,
    item_name: 'Powerbank Robot 20000mAh',
    description: 'Putih dengan stiker anime.',
    category: 'lost',
    image_url: null,
    location_lost: 'Lapangan Basket',
    status: 'claimed',
    contact_phone: '081234567890',
    date_lost: '2026-06-11T16:00:00Z',
    created_at: '2026-06-11T17:00:00Z',
  },
  {
    id: 'report-012',
    user_id: USER_SITI,
    user_fullname: NAME_SITI,
    item_name: 'Kalkulator Casio FX-991EX',
    description: 'Untuk ujian matematika.',
    category: 'lost',
    image_url: null,
    location_lost: 'Ruang 401',
    status: 'unclaimed',
    contact_phone: '082112223333',
    date_lost: '2026-06-10T08:00:00Z',
    created_at: '2026-06-10T10:00:00Z',
  },
  {
    id: 'report-013',
    user_id: USER_FAJAR,
    user_fullname: NAME_FAJAR,
    item_name: 'Helm KYT Hitam',
    description: 'Kaca bening.',
    category: 'found',
    image_url: null,
    location_lost: 'Parkiran Barat',
    status: 'unclaimed',
    contact_phone: '083812345678',
    date_lost: '2026-06-10T18:00:00Z',
    created_at: '2026-06-10T18:30:00Z',
  },

  // DATA LAMA
  {
    id: 'report-014',
    user_id: USER_ADHI,
    user_fullname: NAME_ADHI,
    item_name: 'Buku Kalkulus',
    description: 'Edisi 9.',
    category: 'lost',
    image_url: null,
    location_lost: 'Gazebo Mahasiswa',
    status: 'unclaimed',
    contact_phone: '087832282111',
    date_lost: '2026-05-30T09:00:00Z',
    created_at: '2026-05-30T10:00:00Z',
  },
  {
    id: 'report-015',
    user_id: USER_NISA,
    user_fullname: NAME_NISA,
    item_name: 'Jas Laboratorium',
    description: 'Ukuran M.',
    category: 'found',
    image_url: null,
    location_lost: 'Lab Kimia',
    status: 'unclaimed',
    contact_phone: '085223344556',
    date_lost: '2026-05-28T12:00:00Z',
    created_at: '2026-05-28T13:00:00Z',
  },
  {
    id: 'report-016',
    user_id: USER_BUDI,
    user_fullname: NAME_BUDI,
    item_name: 'Sepatu Running Specs',
    description: 'Ukuran 42.',
    category: 'found',
    image_url: null,
    location_lost: 'Tribun Lapangan',
    status: 'claimed',
    contact_phone: '081234567890',
    date_lost: '2026-05-25T17:00:00Z',
    created_at: '2026-05-25T18:00:00Z',
  },
  {
    id: 'report-017',
    user_id: USER_SITI,
    user_fullname: NAME_SITI,
    item_name: 'Tas Selempang Coklat',
    description: 'Berisi alat tulis.',
    category: 'lost',
    image_url: null,
    location_lost: 'Gedung Pascasarjana',
    status: 'unclaimed',
    contact_phone: '082112223333',
    date_lost: '2026-05-22T14:00:00Z',
    created_at: '2026-05-22T15:00:00Z',
  },
  {
    id: 'report-018',
    user_id: USER_FAJAR,
    user_fullname: NAME_FAJAR,
    item_name: 'Earphone TWS Baseus',
    description: 'Warna putih.',
    category: 'found',
    image_url: null,
    location_lost: 'Masjid Kampus',
    status: 'unclaimed',
    contact_phone: '083812345678',
    date_lost: '2026-05-20T08:00:00Z',
    created_at: '2026-05-20T09:00:00Z',
  },
];

const runSeeder = async () => {
  console.log('🌱 Mulai melakukan seeding data report...');

  try {
    // 1. Bersihkan database terlebih dahulu agar tidak duplikat
    await pool.query('DELETE FROM reports;');
    console.log('🧹 Database dibersihkan.');

    for (const report of dataToSeed) {
      // 2. Buat data menggunakan fungsi bawaan API Gateway
      const result = await createReport(report);

      // Ambil ID yang dihasilkan (karena nanoid meng-generate ID baru di service)
      const generatedId = result.id;

      // 3. INI KUNCINYA: Timpa tanggalnya secara paksa menggunakan Query SQL
      if (report.created_at) {
        await pool.query('UPDATE reports SET created_at = $1 WHERE id = $2', [
          report.created_at,
          generatedId,
        ]);
      }

      console.log(
        `✅ Report [${report.category.toUpperCase()}] ${report.item_name} berhasil dimanipulasi tanggalnya!`,
      );
    }

    console.log(
      `🎉 Berhasil memasukkan ${dataToSeed.length} data laporan baru dengan tanggal bervariasi!`,
    );
    process.exit(0);
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat seeding report:', error);
    process.exit(1);
  }
};

runSeeder();
