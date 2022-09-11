import { Request, Response } from 'express';
import UserService from '../service/user.service';

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
}
