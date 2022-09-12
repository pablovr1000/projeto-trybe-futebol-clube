import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User';
import { userMock } from './mocks/login';
import { StatusCodes } from 'http-status-codes';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Integration test -> /login', () => {
  before(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  describe('Quando Login é efetuado com sucesso', () => {
    it('status code 200', async () => {
      sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);

      const response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: 'secret_user',
        });

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.body).to.have.property('token');
    });
  });

  describe('Quando e-mail e senha estiverem incorretos', () => {
    it('status code 401', async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);

      const response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'wrong@email.com',
          password: 'wrong_password',
        });

      expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Incorrect email or password');
    });
  });

  describe('Quando não fornecer e-mail ou senha', () => {
    it('status code 400', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
          email: '',
        });

      expect(response).to.have.status(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('All fields must be filled');
    });
  });
}); 