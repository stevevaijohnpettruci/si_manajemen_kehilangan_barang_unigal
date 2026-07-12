import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from '../routes/index.js';
import ErrorHandler from '../../../shared/middleware/error.js';

const app = express();

// Membuat variabel __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: ['http://localhost:5173', 'http://145.79.12.168'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const publicPath = path.join(__dirname, '../../../public');
app.use(express.static(publicPath));

app.use(routes);
app.use(ErrorHandler);

export default app;
