import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || '0.0.0.0';

export const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
export const REPORT_SERVICE_URL = process.env.REPORT_SERVICE_URL || 'http://localhost:3002';
export const CLAIM_SERVICE_URL = process.env.CLAIM_SERVICE_URL || 'http://localhost:3003';
export const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3004';
