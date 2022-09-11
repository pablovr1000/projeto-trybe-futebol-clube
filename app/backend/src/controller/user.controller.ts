import { Request, Response } from 'express';
import 'express-async-errors';
import { JwtPayload } from 'jsonwebtoken';
import UserService from '../service/user.service';
import Token from '../utils/token';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  authenticateLogin = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const { code, user, token, message } = await this.userService.login(email, password);

    if (!user) {
      response.status(code).json({ message });
    }

    response.status(code).json(token);
  };

  authenticateValidation = async (request: Request, response: Response) => {
    const { authorization } = request.headers;

    if (!authorization) return response.status(400).json({ message: 'Unauthorized' });

    const validateToken = new Token();
    const decodeUser = await validateToken.decodeToken(authorization) as JwtPayload;

    return response.status(200).json(decodeUser.role);
  };
}
