import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import userRepositories from '../repositories/userRepositories.js';
import InvariantError from '../../../shared/exceptions/invariant-error.js';

export const createUser = async (payload) => {
  const existingEmail = await userRepositories.findUserByEmail(payload.email);
  if (existingEmail) throw new InvariantError('Email sudah terdaftar');

  const existingIdentity = await userRepositories.findUserByIdentityNumber(
    payload.identity_number,
  );
  if (existingIdentity)
    throw new InvariantError('Nomor identitas sudah terdaftar');

  const id = `user-${nanoid(16)}`;
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return userRepositories.createUser({
    ...payload,
    id,
    password: hashedPassword,
  });
};
