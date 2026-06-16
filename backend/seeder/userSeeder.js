import { createReport } from "../../api_gateway/src/services/reportServices.js";

// ID User dan Nama (Berdasarkan data sebelumnya)
const USER_ADHI = 'user-w1noxry7I1fv2zoV';
const NAME_ADHI = 'Adhi Nur Ramadan';
const USER_NISA = 'user-U8uNDdcgyP-ifMhT';
const NAME_NISA = 'Nisa Nurlaila, M.Pd.';

const dataToSeed = [
  {
    id: 'report-lost-004',
    user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Flashdisk Sandisk 32GB',
    description: 'Flashdisk warna merah hitam, berisi file skripsi dan tugas akhir. Sangat penting!',
    category: 'lost', image_url: 'https://example.com/images/fd.jpg',
    location_lost: 'Lab Komputer Dasar', date_lost: '2026-06-14T09:00:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
  },
  {
    id: 'report-found-005',
    user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Tumbler Miniso Biru',
    description: 'Ditemukan botol minum Tumbler warna biru muda tertinggal di meja dosen.',
    category: 'found', image_url: null,
    location_lost: 'Ruang Dosen Fakultas Keguruan', date_lost: '2026-06-15T13:20:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
  },
  {
    id: 'report-lost-006',
    user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Kartu Tanda Mahasiswa (KTM)',
    description: 'Hilang KTM atas nama Adhi Nur Ramadan. Terakhir dipakai di perpustakaan.',
    category: 'lost', image_url: null,
    location_lost: 'Perpustakaan Pusat', date_lost: '2026-06-12T11:45:00Z',
    status: 'claimed', contact_phone: '087832282111',
  },
  {
    id: 'report-found-007',
    user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Earphone TWS Baseus',
    description: 'Ditemukan TWS warna putih beserta case-nya. Kondisi masih menyala.',
    category: 'found', image_url: 'https://example.com/images/tws.jpg',
    location_lost: 'Ruang Seminar Lantai 2', date_lost: '2026-06-16T10:00:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
  },
  {
    id: 'report-lost-008',
    user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Jam Tangan Casio Digital',
    description: 'Jam tangan warna silver strap stainless steel. Terdapat goresan kecil di layarnya.',
    category: 'lost', image_url: 'https://example.com/images/jam.jpg',
    location_lost: 'Lapangan Basket', date_lost: '2026-06-08T16:30:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
  },
  {
    id: 'report-found-009',
    user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Buku Kalkulus Edisi 9',
    description: 'Ditemukan buku tebal Kalkulus. Ada coretan nama "Budi" di halaman pertama.',
    category: 'found', image_url: null,
    location_lost: 'Gazebo Mahasiswa', date_lost: '2026-06-11T14:00:00Z',
    status: 'claimed', contact_phone: '085223344556',
  },
  {
    id: 'report-lost-010',
    user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Charger Laptop ASUS',
    description: 'Kabel charger laptop ASUS ujung bulat. Hilang saat kerja kelompok.',
    category: 'lost', image_url: null,
    location_lost: 'Kantin Teknik', date_lost: '2026-06-13T12:15:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
  },
  {
    id: 'report-found-011',
    user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Payung Lipat Merah Maroon',
    description: 'Tertinggal payung lipat kondisi basah di depan pintu masuk tata usaha.',
    category: 'found', image_url: null,
    location_lost: 'Gedung Tata Usaha', date_lost: '2026-06-05T08:00:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
  },
  {
    id: 'report-lost-012',
    user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Kalkulator Scientific Casio',
    description: 'Kalkulator tipe fx-991EX ClassWiz. Terakhir dipakai saat ujian.',
    category: 'lost', image_url: 'https://example.com/images/kalkulator.jpg',
    location_lost: 'Ruang Ujian 401', date_lost: '2026-06-09T10:30:00Z',
    status: 'claimed', contact_phone: '087832282111',
  },
  {
    id: 'report-found-013',
    user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Kacamata Minus Frame Bulat',
    description: 'Kacamata frame besi tipis warna gold, lensa cukup tebal.',
    category: 'found', image_url: null,
    location_lost: 'Masjid Kampus', date_lost: '2026-06-14T12:30:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
  },
  {
    id: 'report-lost-014',
    user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'STNK Motor Vario Hitam',
    description: 'STNK terlipat tanpa dompet. Jatuh dari saku celana.',
    category: 'lost', image_url: null,
    location_lost: 'Area Parkir Gerbang Depan', date_lost: '2026-06-15T07:45:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
  },
  {
    id: 'report-found-015',
    user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Jaket Himpunan Mahasiswa',
    description: 'Jaket warna biru dongker ukuran L. Terdapat pin logo organisasi.',
    category: 'found', image_url: 'https://example.com/images/jaket.jpg',
    location_lost: 'Aula Utama', date_lost: '2026-06-07T15:00:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
  },
  {
    id: 'report-lost-016',
    user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Mouse Wireless Logitech M220',
    description: 'Mouse warna abu-abu. Dongle-nya masih tertancap di laptop saya.',
    category: 'lost', image_url: null,
    location_lost: 'Perpustakaan Lantai 2', date_lost: '2026-06-10T13:00:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
  },
  {
    id: 'report-found-017',
    user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Kotak Pensil Joyko Transparan',
    description: 'Kotak pensil berisi pulpen, stabilo, dan tipe-x kertas.',
    category: 'found', image_url: null,
    location_lost: 'Ruang Kelas 105', date_lost: '2026-06-16T08:30:00Z',
    status: 'claimed', contact_phone: '085223344556',
  },
  {
    id: 'report-lost-018',
    user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Powerbank Robot 10000mAh',
    description: 'Powerbank warna putih dengan stiker anime kecil di belakang.',
    category: 'lost', image_url: 'https://example.com/images/pb.jpg',
    location_lost: 'Kantin Fakultas', date_lost: '2026-06-11T12:00:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
  },
  {
    id: 'report-found-019',
    user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Jas Laboratorium Putih',
    description: 'Tertinggal jas lab ukuran M, sedikit kotor di bagian lengan.',
    category: 'found', image_url: null,
    location_lost: 'Laboratorium Kimia', date_lost: '2026-06-06T11:00:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
  },
  {
    id: 'report-lost-020',
    user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Kunci Kamar Kos',
    description: 'Kunci kamar kos dengan gantungan tokoh kartun Spongebob.',
    category: 'lost', image_url: null,
    location_lost: 'Jalan Setapak Kampus', date_lost: '2026-06-13T17:20:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
  },
  {
    id: 'report-found-021',
    user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Helm Bogo Hitam Doff',
    description: 'Ditemukan helm bogo kaca datar tertinggal di kursi panjang halte.',
    category: 'found', image_url: 'https://example.com/images/helm.jpg',
    location_lost: 'Halte Bis Kampus', date_lost: '2026-06-15T16:00:00Z',
    status: 'claimed', contact_phone: '085223344556',
  },
  {
    id: 'report-lost-022',
    user_id: USER_ADHI, user_fullname: NAME_ADHI,
    item_name: 'Map Plastik berisi Dokumen Laporan',
    description: 'Map kuning bening berisi kertas laporan praktikum. Sangat penting untuk dinilai.',
    category: 'lost', image_url: null,
    location_lost: 'Ruang Tunggu Dosen', date_lost: '2026-06-16T09:15:00Z',
    status: 'unclaimed', contact_phone: '087832282111',
  },
  {
    id: 'report-found-023',
    user_id: USER_NISA, user_fullname: NAME_NISA,
    item_name: 'Sepatu Olahraga Specs',
    description: 'Sepatu lari warna abu-abu ukuran 40, tertinggal di tribun.',
    category: 'found', image_url: null,
    location_lost: 'Tribun Lapangan Sepak Bola', date_lost: '2026-06-10T18:00:00Z',
    status: 'unclaimed', contact_phone: '085223344556',
  }
];

const runSeeder = async () => {
  console.log('🌱 Mulai melakukan seeding data report...');

  try {
    for (const report of dataToSeed) {
      await createReport(report);
      console.log(`✅ Report [${report.category.toUpperCase()}] ${report.item_name} berhasil ditambahkan! Status: ${report.status}`);
    }

    console.log(`🎉 Berhasil memasukkan ${dataToSeed.length} data laporan baru!`);
    process.exit(0); 
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat seeding report:', error);
    process.exit(1); 
  }
};

// Menjalankan seeder
runSeeder();