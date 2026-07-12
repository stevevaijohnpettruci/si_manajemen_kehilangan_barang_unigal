import nodemailer from 'nodemailer';
import {
  USE_ETHEREAL,
  MAIL_SERVER,
  MAIL_SERVER_PASSWORD,
} from '../config/env.js';

const createTransporter = async () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: MAIL_SERVER,
      pass: MAIL_SERVER_PASSWORD,
    },
    connectionTimeout: 10000,
    socketTimeout: 10000,
  });
};

export const sendClaimEmail = async ({
  to,
  report_id,
  reporter_name,
  contact_phone,
  description,
  created_at,
}) => {
  if (USE_ETHEREAL === 'true') {
    // ← skip kirim email, log saja untuk testing
    console.log('[Mailer] ===== MOCK EMAIL =====');
    console.log('[Mailer] To:', to);
    console.log('[Mailer] Subject: Notifikasi Klaim Baru: #' + report_id);
    console.log('[Mailer] Reporter:', reporter_name);
    console.log('[Mailer] Phone:', contact_phone);
    console.log('[Mailer] Description:', description);
    console.log('[Mailer] Date:', new Date(created_at).toLocaleDateString('id-ID'));
    console.log('[Mailer] =======================');
    return;
  }

  const transporter = await createTransporter();

  const info = await transporter.sendMail({
    from: `"Unigal Silacak Apps" <${MAIL_SERVER}>`,
    to,
    subject: `Notifikasi Klaim Baru: #${report_id}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #8B52A1; padding: 20px; text-align: center; color: white;">
          <h2 style="margin: 0;">Unigal Silacak Apps</h2>
        </div>
        <div style="padding: 25px;">
          <p style="font-size: 16px;">Halo,</p>
          <p>Ada pengajuan klaim baru untuk laporan yang Anda buat. Berikut adalah detailnya:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #8B52A1;">
            <ul style="list-style-type: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 10px;"><strong>ID Laporan:</strong> ${report_id}</li>
              <li style="margin-bottom: 10px;"><strong>Nama Pemohon:</strong> ${reporter_name}</li>
              <li style="margin-bottom: 10px;"><strong>No. HP Pemohon:</strong> ${contact_phone}</li>
              <li style="margin-bottom: 10px;"><strong>Deskripsi:</strong> ${description}</li>
              <li><strong>Tanggal Pengajuan:</strong> ${new Date(created_at).toLocaleDateString('id-ID')}</li>
            </ul>
          </div>
          <p style="margin-top: 25px;">Silakan segera buka aplikasi <strong>Unigal Silacak Apps</strong> untuk melakukan verifikasi data atau meninjau bukti klaim yang dilampirkan.</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:5173/klaim/pengajuan-masuk" style="background-color: #8B52A1; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Review Klaim Sekarang</a>
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p>Pesan ini dikirim secara otomatis oleh sistem Unigal Silacak Apps.<br>Mohon jangan membalas email ini.</p>
        </div>
      </div>
    `,
  });

  console.log('[Mailer] Email sent to:', to);
};

export const sendUpdateClaimStatusEmail = async ({
  to,
  report_id,
  reporter_name,
  status, // 'accepted' atau 'rejected'
}) => {
  if (USE_ETHEREAL === 'true') {
    console.log('[Mailer] ===== MOCK EMAIL =====');
    console.log('[Mailer] To:', to);
    console.log('[Mailer] Subject: Update Status Klaim: #' + report_id);
    console.log('[Mailer] Status:', status);
    console.log('[Mailer] =======================');
    return;
  }

  const transporter = await createTransporter();

  const isAccepted = status === 'accepted';

  await transporter.sendMail({
    from: `"Unigal Silacak Apps" <${MAIL_SERVER}>`,
    to,
    subject: `Update Status Klaim #${report_id}: ${isAccepted ? 'Diterima ✓' : 'Ditolak ✗'}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #8B52A1; padding: 20px; text-align: center; color: white;">
          <h2 style="margin: 0;">Unigal Silacak Apps</h2>
        </div>
        <div style="padding: 25px;">
          <p style="font-size: 16px;">Halo, <strong>${reporter_name}</strong></p>
          <p>Status pengajuan klaim Anda untuk laporan <strong>#${report_id}</strong> telah diperbarui.</p>

          <div style="text-align: center; margin: 25px 0;">
            <span style="
              display: inline-block;
              padding: 10px 30px;
              border-radius: 20px;
              font-size: 18px;
              font-weight: bold;
              background-color: ${isAccepted ? '#d4edda' : '#f8d7da'};
              color: ${isAccepted ? '#155724' : '#721c24'};
            ">
              ${isAccepted ? '✓ Klaim Diterima' : '✗ Klaim Ditolak'}
            </span>
          </div>

          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #8B52A1;">
            <ul style="list-style-type: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 10px;"><strong>ID Laporan:</strong> ${report_id}</li>
              <li><strong>Status:</strong> ${isAccepted ? 'Diterima' : 'Ditolak'}</li>
            </ul>
          </div>

          <p style="margin-top: 20px;">
            ${isAccepted
              ? 'Selamat! Klaim Anda telah <strong>diterima</strong> oleh pemilik laporan. Silakan hubungi pemilik laporan untuk proses selanjutnya.'
              : 'Mohon maaf, klaim Anda <strong>ditolak</strong> oleh pemilik laporan. Anda dapat mengajukan klaim baru dengan informasi yang lebih lengkap.'}
          </p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:5173/klaim/riwayat" style="background-color: #8B52A1; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Lihat Riwayat Klaim
            </a>
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p>Pesan ini dikirim secara otomatis oleh sistem Unigal Silacak Apps.<br>Mohon jangan membalas email ini.</p>
        </div>
      </div>
    `,
  });

  console.log('[Mailer] Status email sent to:', to);
};