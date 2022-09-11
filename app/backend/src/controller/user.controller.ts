import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import login from '../interfaces/login';
import UserService from '../service/user.service';

require('express-async-errors');

class UserController {
  constructor(private userService = new UserService()) {}

  public authenticateLogin = async (request: Request, response: Response) => {
    const payload: login = request.body;
    const user = await this.userService.login(payload);

    response.status(StatusCodes.OK).json(user);
  };

  public authenticateValidation = async (_req: Request, res: Response) => {
    const { payload } = res.locals;

    const role = await this.userService.role(payload.email);

    res.status(StatusCodes.OK).json(role);
  };
}

export default new UserController();
