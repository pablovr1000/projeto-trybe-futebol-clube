import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.log(error);
  return response.status(500).json({ error, message: 'Internal Server Error' });
};

export default errorMiddleware;
