import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StatusError from '../utils/http.exception';
import { ReturnJwt } from '../interfaces/jwt';
import jwt from '../utils/jwt';

const validateToken = (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return next({ status: StatusCodes.UNAUTHORIZED, message: 'Token not found' });
  }

  try {
    const token = jwt.verify(authorization as string) as ReturnJwt;
    response.locals.payload = token;
  } catch (e) {
    if (e instanceof Error) {
      console.log('Token error: ', e.message);
    }
    throw new StatusError('Token must be a valid token', StatusCodes.UNAUTHORIZED);
  }

  return next();
};

export default validateToken;
