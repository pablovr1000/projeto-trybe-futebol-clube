import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import { ReturnJwt, Token } from '../interfaces/jwt';
import jwt from '../utils/jwt';

export default class UserService {
  public login = async (email: string, password: string) => {
    const getEmail = await User.findOne({ where: { email } });
    if (!getEmail) return { code: 401, message: 'Incorrect email or password' };

    const validPassword = await bcrypt.compare(password, getEmail.password);
    if (!validPassword) return { code: 401, message: 'Incorrect email or password' };

    const { id, username, role } = getEmail;
    const payload: ReturnJwt = { id, username, role };
    const token: Token = jwt.generate(payload);
    const user = {
      id,
      username,
      email,
      role,
    };

    return { code: 200, user: { user }, token };
  };
}
