import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const joiValidation = (
  schema: Joi.ObjectSchema,
) => async (request: Request, response: Response, next: NextFunction) => {
  await schema.validateAsync({
    body: request.body,
  });

  return next();
};

export default joiValidation;
