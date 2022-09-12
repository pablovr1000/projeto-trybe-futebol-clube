import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import Team from '../database/models/Teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import allTeamMock from './mocks/findAllTeam';
import teamMock from './mocks/findTeam'

describe('/teams tests', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(allTeamMock as any);

    sinon
      .stub(Team, 'findByPk')
      .resolves(teamMock as any)
  })

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  });

  describe('GET /teams Irá testar getAllTeams', () => {
    it('should get teams', async () => {


      chaiHttpResponse = await chai
        .request(app)
        .get('/teams')

      expect(chaiHttpResponse).to.have.status(200)
      expect(chaiHttpResponse.body).has.length
    });
  })

  describe('GET /teams/:id Irá testar getTeamById', () => {
    it('should get team by id', async () => {


      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/8')

      expect(chaiHttpResponse).to.have.status(200)
      expect(chaiHttpResponse.body).has.length
    });
  })

});