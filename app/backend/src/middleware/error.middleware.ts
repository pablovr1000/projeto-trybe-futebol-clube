import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.log(error);
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error, message: 'Internal Server Error' });
};

export default errorMiddleware;
