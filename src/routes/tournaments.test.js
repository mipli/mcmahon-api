import {cleanDb, addTestTournament, addTestTournamentWithPlayer} from '../utils';
import supertest from 'supertest';
import {expect} from 'chai';
import app from '../app';

const request = supertest.agent(app.listen());

describe('Tournament Routes', () => {
  beforeEach((done) => {
    cleanDb();
    done();
  })

  it('should return null when there are no tournaments', (done) => {
    request
      .get('/tournaments')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.empty;
        done();
      });
  })

  it('should create a tournament', (done) => {
    request
      .post('/tournaments')
      .send({
        name: 'test'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.name).to.eql('test');
        expect(res.body.players).to.be.empty;
        expect(res.body.players).to.be.an.array;
        expect(res.body.rounds).to.be.empty;
        expect(res.body.rounds).to.be.an.array;
        done();
      });
  })

  it('should get the tournament', async () => {
    const tournament = await addTestTournament();
    return new Promise((resolve, reject) => {
      request
        .get('/tournaments')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.length.of(1);
          expect(res.body[0].name).to.eql('Test');
          resolve();
        });
    });
  })

  it('should add one player to tournament', async () => {
    const tournament = await addTestTournament();
    return new Promise((resolve, reject) => {
      request
        .post('/tournaments/' + tournament._id + '/players')
        .send([{
          firstname: 'first',
          lastname: 'last'
        }])
        .expect(200)
        .end((err, res) => {
          expect(res.body.players).to.have.length.of(1);
          expect(res.body.players[0].firstname).to.eql('first');
          expect(res.body.players[0].lastname).to.eql('last');
          resolve();
        });
    });
  });

  it('should add multiple players to tournament', async () => {
    const tournament = await addTestTournament();
    return new Promise((resolve, reject) => {
      request
        .post('/tournaments/' + tournament._id + '/players')
        .send([{
          firstname: 'first',
          lastname: 'last'
        }, {
          firstname: 'first 2',
          lastname: 'last 2'
        }, {
          firstname: 'first 3',
          lastname: 'last 3'
        }])
        .expect(200)
        .end((err, res) => {
          expect(res.body.players).to.have.length.of(3);
          expect(res.body.players[0].firstname).to.eql('first');
          expect(res.body.players[0].lastname).to.eql('last');
          expect(res.body.players[1].firstname).to.eql('first 2');
          expect(res.body.players[1].lastname).to.eql('last 2');
          expect(res.body.players[2].firstname).to.eql('first 3');
          expect(res.body.players[2].lastname).to.eql('last 3');
          resolve();
        });
    });
  });

  it('should update a player', async () => {
    const tournament = await addTestTournamentWithPlayer();
    return new Promise((resolve, reject) => {
      request
        .put('/tournaments/' + tournament._id + '/players/' + tournament.players[0]._id)
        .send({
          firstname: 'first',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.players[0].firstname).to.eql('first');
          expect(res.body.players[0].lastname).to.eql('lastname');
          resolve();
        });
    });
  });

  it('should delete a player', async () => {
    const tournament = await addTestTournamentWithPlayer();
    return new Promise((resolve, reject) => {
      request
        .delete('/tournaments/' + tournament._id + '/players/' + tournament.players[0]._id)
        .send({
          firstname: 'first',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.players).to.have.length.of(0);
          resolve();
        });
    });
  });
});
