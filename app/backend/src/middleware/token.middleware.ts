import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReturnJwt } from '../interfaces/jwt';
import jwt from '../utils/jwt';

const validateToken = (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const token = jwt.verify(authorization as string) as ReturnJwt;
    response.locals.payload = token;
  } catch (e) {
    if (e instanceof Error) {
      console.log('Token error: ', e.message);
    }
    return response.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Token must be a valid token' });
  }

  return next();
};

export default validateToken;
