import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import jwt from '../utils/jwt';

function validateToken(request: Request, response: Response, next: NextFunction) {
  const token = <string>request.headers.authorization;

  try {
    const userDecoded: string | JwtPayload = jwt.verify(token);

    response.locals.user = userDecoded;
    next();
  } catch (error: any) {
    error.status = 401;

    error.message = 'Token must be a valid token';

    next(error);
  }
}

export default validateToken;
