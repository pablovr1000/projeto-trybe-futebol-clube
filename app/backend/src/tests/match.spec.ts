import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import allMatches from './mocks/findAllMatches';
import teamById from './mocks/findTeam'

describe('Match, testes', () => {
  let chaiResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(allMatches as any);

    sinon
      .stub(Match, 'findByPk')
      .resolves(teamById as any)
  })

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  });

  describe('Irá testar getAllMatches', () => {
    it('Deverá retornar todas matches', async () => {
      chaiResponse = await chai
        .request(app)
        .get('/matches')

      expect(chaiResponse).to.have.status(200)
      
      expect(chaiResponse.body).has.length
    });
  })

  describe('Irá testar post em /match', () => {
    it('Deverá retornar UNAUTHORIZED', async () => {
      chaiResponse = await chai
        .request(app)
        .post('/matches')

      expect(chaiResponse).to.have.status(401)
    });
  })
});