import { createUser } from '../api_gateway/src/services/userServices.js';

const usersToSeed = [
  {
    first_name: 'Adhi',
    last_name: 'Nur Ramadan',
    role: 'mahasiswa', // Wajib diisi sekarang
    full_name: 'Adhi Nur Ramadan',
    email: 'adhinur@unigal.ac.id',
    password: 'jakarta191004',
    identity_number: '7020230024', // Ganti nama key-nya
    address: 'Jl. Moch Bagowi Kp. Karangsari...',
    phone_number: '087832282111',
    faculty: 'Teknik',
    study_program: 'Sistem Informasi',
  },
  {
    first_name: 'Nisa',
    last_name: 'Nurlaila',
    role: 'dosen', // Contoh untuk dosen
    full_name: 'Nisa Nurlaila, M.Pd.',
    email: 'nisa.nurlaila@unigal.ac.id',
    password: 'password123',
    identity_number: '0420058801', // NIDN Dosen
    address: 'Jl. Ciamis-Banjar Km. 3...',
    phone_number: '085223344556',
    faculty: 'Keguruan dan Ilmu Pendidikan',
    study_program: 'Pendidikan Bahasa Inggris',
  },
];

const runSeeder = async () => {
  console.log('🌱 Mulai melakukan seeding data user...');

  try {
    for (const user of usersToSeed) {
      await createUser(user);
      console.log(`✅ User ${user.full_name} berhasil ditambahkan!`);
    }

    console.log('🎉 Seeding selesai dengan sukses!');
    process.exit(0); // Keluar dari proses setelah selesai
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat seeding:', error);
    process.exit(1); // Keluar dengan kode error
  }
};

// Menjalankan seeder
runSeeder();
