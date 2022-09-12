import * as Joi from 'joi';

export const createMatch = Joi.object({
  body: Joi.object({
    homeTeam: Joi.number().required(),
    awayTeam: Joi.number().required(),
    homeTeamGoals: Joi.number().required(),
    awayTeamGoals: Joi.number().required(),
    inProgress: Joi.boolean().required(),
  }),
});

export const updateMatch = Joi.object({
  body: Joi.object({
    homeTeamGoals: Joi.number().required(),
    awayTeamGoals: Joi.number().required(),
  }),
});
