import { StatusCodes } from 'http-status-codes';
import { compare } from 'bcryptjs';
import jwt from '../utils/jwt';
import StatusError from '../utils/http.exception';
import User from '../database/models/User';
import login from '../interfaces/login';

const unauthorizedMessage = 'Incorrect email or password';

export default class UserServices {
  private _user: User | null;

  public login = async ({ email, password }: login) => {
    this._user = await User.findOne({ where: { email } });

    if (!this._user) {
      return new StatusError(unauthorizedMessage, StatusCodes.UNAUTHORIZED);
    }

    const passwordValidate = await compare(password, this._user.password);
    if (!passwordValidate) {
      return new StatusError(unauthorizedMessage, StatusCodes.UNAUTHORIZED);
    }

    const payload = {
      id: this._user.id,
      role: this._user.role,
      username: this._user.username,
      email: this._user.email,
    };

    const { token } = jwt.generate(payload);
    return { token };
  };

  public role = async (jwtEmail: number) => {
    this._user = await User.findOne({
      where: {
        email: jwtEmail,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    if (!this._user) {
      return { statusCode: StatusCodes.BAD_REQUEST, message: 'User not find' };
    }

    return { role: this._user?.role };
  };
}
