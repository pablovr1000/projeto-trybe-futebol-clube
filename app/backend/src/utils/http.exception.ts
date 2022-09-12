import { StatusCodes } from 'http-status-codes';

export default class HttpException extends Error {
  status: StatusCodes;

  constructor(message: string, status: StatusCodes) {
    super(message);
    this.status = status;
  }
}
