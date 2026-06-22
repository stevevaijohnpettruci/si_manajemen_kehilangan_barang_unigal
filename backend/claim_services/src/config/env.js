import 'dotenv/config';
import process from 'node:process';

export const PORT = process.env.PORT || 3003;
export const HOST = process.env.HOST || '0.0.0.0';

export const PGUSER = process.env.PGUSER;
export const PGHOST = process.env.PGHOST;
export const PGPASSWORD = process.env.PGPASSWORD;
export const PGDATABASE = process.env.PGDATABASE;
export const PGPORT = process.env.PGPORT;

export const USE_ETHEREAL = process.env.USE_ETHEREAL;
export const MAIL_SERVER = process.env.MAIL_SERVER;
export const MAIL_SERVER_PASSWORD = process.env.MAIL_SERVER_PASSWORD;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const RESEND_API_KEY = process.env.RESEND_API_KEY;
