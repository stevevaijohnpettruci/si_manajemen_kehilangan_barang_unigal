import 'dotenv/config';
import app from './server/index.js';

const port = process.env.PORT || 3002;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`report_service running at http://${host}:${port}`);
});
