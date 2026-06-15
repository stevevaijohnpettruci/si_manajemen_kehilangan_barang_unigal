import Joi from 'joi';

export const createUserSchema = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).required(),
  // Tambahkan .valid() untuk membatasi role apa saja yang diperbolehkan
  role: Joi.string().valid('mahasiswa', 'dosen', 'staff', 'admin').required(),
  full_name: Joi.string().max(200).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),

  // Ubah student_id_number menjadi identity_number agar mencakup NIM, NIDN, NIK
  identity_number: Joi.string().max(30).required(),

  address: Joi.string().required(),
  phone_number: Joi.string().max(15).required(),

  // Faculty & study_program dibikin allow('', null) karena mungkin Staff/Admin tidak terikat fakultas
  faculty: Joi.string().max(100).allow('', null).optional(),
  study_program: Joi.string().max(100).allow('', null).optional(),
});

export const loginSchema = Joi.object({
  // Login sekarang menggunakan identity_number (NIM/NIDN/NIK)
  identity_number: Joi.string().required(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
