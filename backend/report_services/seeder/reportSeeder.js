import dotenv from 'dotenv';
dotenv.config({path:'./.env'});



import { createReport } from "../../api_gateway/src/services/reportServices.js";
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

const dataToSeed = [
  // --- KELOMPOK 1: HARI INI (16 Juni 2026) ---
  {
    id: 'report-lost-004', user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Flashdisk Sandisk 32GB', description: 'Flashdisk warna merah hitam.',
    category: 'lost', image_url: 'https://example.com/images/fd.jpg',
    location_lost: 'Lab Komputer Dasar', date_lost: '2026-06-16T09:00:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
    created_at: '2026-06-16T10:00:00Z'
  },
  {
    id: 'report-found-005', user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Tumbler Miniso Biru', description: 'Ditemukan botol minum.',
    category: 'found', image_url: null,
    location_lost: 'Ruang Dosen', date_lost: '2026-06-16T13:20:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
    created_at: '2026-06-16T14:00:00Z'
  },
  {
    id: 'report-lost-006', user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Earphone TWS Baseus', description: 'TWS warna putih beserta case-nya.',
    category: 'lost', image_url: 'https://example.com/images/tws.jpg',
    location_lost: 'Ruang Seminar', date_lost: '2026-06-16T08:00:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
    created_at: '2026-06-16T09:30:00Z'
  },
  {
    id: 'report-found-007', user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Kacamata Minus', description: 'Kacamata frame besi tipis.',
    category: 'found', image_url: null,
    location_lost: 'Masjid Kampus', date_lost: '2026-06-16T15:00:00Z',
    status: 'claimed', contact_phone: '085223344556',
    created_at: '2026-06-16T15:30:00Z'
  },
  {
    id: 'report-lost-008', user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'STNK Motor Vario', description: 'STNK terlipat tanpa dompet.',
    category: 'lost', image_url: null,
    location_lost: 'Area Parkir', date_lost: '2026-06-16T07:45:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
    created_at: '2026-06-16T08:00:00Z'
  },

  // --- KELOMPOK 2: 3 HARI YANG LALU (14 - 15 Juni 2026) ---
  {
    id: 'report-found-009', user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Kartu Tanda Mahasiswa (KTM)', description: 'Ditemukan KTM atas nama Adhi.',
    category: 'found', image_url: null,
    location_lost: 'Perpustakaan Pusat', date_lost: '2026-06-15T11:45:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
    created_at: '2026-06-15T12:00:00Z'
  },
  {
    id: 'report-lost-010', user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Charger Laptop ASUS', description: 'Kabel charger laptop ujung bulat.',
    category: 'lost', image_url: null,
    location_lost: 'Kantin Teknik', date_lost: '2026-06-14T12:15:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
    created_at: '2026-06-14T14:00:00Z'
  },
  {
    id: 'report-found-011', user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Kotak Pensil Joyko', description: 'Kotak pensil transparan.',
    category: 'found', image_url: null,
    location_lost: 'Ruang Kelas 105', date_lost: '2026-06-15T08:30:00Z',
    status: 'claimed', contact_phone: '085223344556',
    created_at: '2026-06-15T09:00:00Z'
  },
  {
    id: 'report-lost-012', user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Kunci Kamar Kos', description: 'Kunci dengan gantungan Spongebob.',
    category: 'lost', image_url: null,
    location_lost: 'Jalan Setapak Kampus', date_lost: '2026-06-14T17:20:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
    created_at: '2026-06-14T18:00:00Z'
  },
  {
    id: 'report-found-013', user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Helm Bogo Hitam Doff', description: 'Ditemukan helm bogo kaca datar.',
    category: 'found', image_url: 'https://example.com/images/helm.jpg',
    location_lost: 'Halte Bis Kampus', date_lost: '2026-06-15T16:00:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
    created_at: '2026-06-15T16:30:00Z'
  },

  // --- KELOMPOK 3: 1 MINGGU YANG LALU (10 - 13 Juni 2026) ---
  {
    id: 'report-lost-014', user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Buku Kalkulus Edisi 9', description: 'Buku tebal Kalkulus. Ada coretan nama.',
    category: 'lost', image_url: null,
    location_lost: 'Gazebo Mahasiswa', date_lost: '2026-06-11T14:00:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
    created_at: '2026-06-11T15:00:00Z'
  },
  {
    id: 'report-found-015', user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Mouse Wireless Logitech', description: 'Mouse warna abu-abu.',
    category: 'found', image_url: null,
    location_lost: 'Perpustakaan Lantai 2', date_lost: '2026-06-10T13:00:00Z',
    status: 'claimed', contact_phone: '085223344556',
    created_at: '2026-06-10T14:00:00Z'
  },
  {
    id: 'report-lost-016', user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Powerbank Robot 10000mAh', description: 'Powerbank warna putih stiker anime.',
    category: 'lost', image_url: 'https://example.com/images/pb.jpg',
    location_lost: 'Kantin Fakultas', date_lost: '2026-06-11T12:00:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
    created_at: '2026-06-12T08:00:00Z'
  },
  {
    id: 'report-found-017', user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Sepatu Olahraga Specs', description: 'Sepatu lari warna abu-abu ukuran 40.',
    category: 'found', image_url: null,
    location_lost: 'Tribun Lapangan', date_lost: '2026-06-10T18:00:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
    created_at: '2026-06-11T09:00:00Z'
  },
  {
    id: 'report-lost-018', user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Jam Tangan Casio Digital', description: 'Jam tangan warna silver.',
    category: 'lost', image_url: 'https://example.com/images/jam.jpg',
    location_lost: 'Lapangan Basket', date_lost: '2026-06-12T16:30:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
    created_at: '2026-06-13T07:00:00Z'
  },

  // --- KELOMPOK 4: DATA LAMA (Mei 2026) ---
  {
    id: 'report-found-019', user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Payung Lipat Merah Maroon', description: 'Tertinggal payung lipat.',
    category: 'found', image_url: null,
    location_lost: 'Gedung Tata Usaha', date_lost: '2026-06-05T08:00:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
    created_at: '2026-06-05T10:00:00Z'
  },
  {
    id: 'report-lost-020', user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Kalkulator Scientific Casio', description: 'Tipe fx-991EX.',
    category: 'lost', image_url: 'https://example.com/images/kalkulator.jpg',
    location_lost: 'Ruang Ujian 401', date_lost: '2026-05-28T10:30:00Z',
    status: 'claimed', contact_phone: '087832282111',
    created_at: '2026-05-28T12:00:00Z'
  },
  {
    id: 'report-found-021', user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Jas Laboratorium Putih', description: 'Jas lab kotor di lengan.',
    category: 'found', image_url: null,
    location_lost: 'Laboratorium Kimia', date_lost: '2026-05-20T11:00:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
    created_at: '2026-05-20T13:00:00Z'
  },
  {
    id: 'report-lost-022', user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Map Plastik berisi Dokumen', description: 'Map kuning bening.',
    category: 'lost', image_url: null,
    location_lost: 'Ruang Tunggu Dosen', date_lost: '2026-05-15T09:15:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
    created_at: '2026-05-16T08:00:00Z'
  },
  {
    id: 'report-found-023', user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Jaket Himpunan Mahasiswa', description: 'Jaket warna biru dongker.',
    category: 'found', image_url: 'https://example.com/images/jaket.jpg',
    location_lost: 'Aula Utama', date_lost: '2026-06-01T15:00:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
    created_at: '2026-06-02T10:00:00Z'
  }
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
        await pool.query(
          'UPDATE reports SET created_at = $1 WHERE id = $2',
          [report.created_at, generatedId]
        );
      }

      console.log(`✅ Report [${report.category.toUpperCase()}] ${report.item_name} berhasil dimanipulasi tanggalnya!`);
    }

    console.log(`🎉 Berhasil memasukkan ${dataToSeed.length} data laporan baru dengan tanggal bervariasi!`);
    process.exit(0); 
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat seeding report:', error);
    process.exit(1); 
  }
};

runSeeder();