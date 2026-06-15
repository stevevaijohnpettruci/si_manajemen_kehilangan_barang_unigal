import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from '../routes/index.js';
import ErrorHandler from '../../../shared/middleware/error.js';

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://145.79.12.168'], // Tambahkan URL frontend kamu di sini
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Jika kamu memakai cookie/session
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(ErrorHandler);

export default app;
