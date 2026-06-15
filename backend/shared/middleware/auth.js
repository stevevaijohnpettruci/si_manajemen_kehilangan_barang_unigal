/* [AUTH] middleware verify JWT \u2014 dipakai di api_gateway untuk proteksi route */
import TokenManager from '../security/tokenManager.js';
import { ClientError } from '../exceptions/index.js';

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ClientError('Token tidak ditemukan', 401));
  }

  const token = authHeader.split(' ')[1];
  const payload = TokenManager.verify(token, process.env.ACCESS_TOKEN_KEY);
  req.user = payload;
  next();
};

export default auth;
/* [AUTH] end */
