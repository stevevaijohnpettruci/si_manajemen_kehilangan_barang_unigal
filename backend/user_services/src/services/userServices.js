import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import userRepositories from '../repositories/userRepositories.js';
import InvariantError from '../../../shared/exceptions/invariant-error.js';

export const createUser = async (payload) => {
  const existing = await userRepositories.findUserByEmail(payload.email);
  if (existing) throw new InvariantError('Email sudah terdaftar');

  const id = `user-${nanoid(16)}`;
  const hashedPassword = await bcrypt.hash(payload.password, 10);
 

  return userRepositories.createUser({ ...payload, id, password: hashedPassword });
};
