import * as jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import TokenInterface from '../interfaces/jwt';

export default class Token {
  public encodeToken = async (
    { id, username, email, role }: TokenInterface,
  ): Promise<string> => jwt.sign(
    { id, username, email, role },
    await readFile('secret.key', 'utf8'),
    { expiresIn: '1h', algorithm: 'HS256' },
  );

  public decodeToken = async (token: string) => jwt
    .verify(token, await readFile('secret.key', 'utf8'));
}
