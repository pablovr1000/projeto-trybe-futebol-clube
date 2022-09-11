import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ReturnJwt, Token } from '../interfaces/jwt';

export default {
  generate: (payload: ReturnJwt): Token => {
    const token: string = jwt
      .sign(payload, process.env.JWT_SECRET || 'secret');

    return { token };
  },

  verify: (token: string): string | jwt.JwtPayload => {
    const userValidate: string | jwt.JwtPayload = jwt
      .verify(token, process.env.JWT_SECRET || 'secret');

    return userValidate;
  },
};
