import 'dotenv/config';
import express from 'express';
import ErrorHandler from '../../../shared/middleware/error.js';
import routes from '../routes/index.js'; // Sesuaikan jika kamu pakai index.js
import startNotificationConsumer from '../messaging/notificationConsumer.js'; // Import consumernya

const app = express();

// 1. Parsing body berupa JSON
app.use(express.json());

// 2. Pasang semua routes (HARUS SEBELUM ERROR HANDLER)
app.use(routes); 

// 3. Pasang ErrorHandler (HARUS PALING BAWAH)
app.use(ErrorHandler);

startNotificationConsumer().catch(err => {
  console.error('[RabbitMQ] Gagal menjalankan consumer:', err);
});

export default app;