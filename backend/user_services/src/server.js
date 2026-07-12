import 'dotenv/config';
import app from './server/index.js';

const port = process.env.PORT || 3001;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`user_service running at http://${host}:${port}`);
});
