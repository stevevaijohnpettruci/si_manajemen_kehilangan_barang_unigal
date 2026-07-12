import 'dotenv/config';
import express from 'express';
import routes from '../routes/index.js';
import ErrorHandler from '../../../shared/middleware/error.js';
import startUserRpcServer from '../messaging/userRpcServer.js';

const app = express();

app.use(express.json());
app.use(routes);
app.use(ErrorHandler);

startUserRpcServer().catch(console.error);

export default app;
