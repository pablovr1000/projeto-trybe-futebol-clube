import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userSchema from './joi/user.joi';

const userMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body;

  const { error } = userSchema.validate({ email, password }, { abortEarly: false });

  if (error) {
    return response.status(StatusCodes.BAD_REQUEST).json(error.message);
  }

  return next();
};

export default userMiddleware;
