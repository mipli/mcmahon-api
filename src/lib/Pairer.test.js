import {expect} from 'chai';

import {createPairing} from './Pairer';

describe('Pairing algorithm', () => {
  it('should create pairs for even number of players', () => {
    Math.random = () => {
      return 0;
    };
    const players = [{
      name: 'player 1'
    }, {
      name: 'player 2'
    }, {
      name: 'player 3'
    }, {
      name: 'player 4'
    }];
    const pairing = createPairing(players);
    expect(pairing).to.have.length.of(2);
    expect(pairing[0]).to.eql({
      white: {name: 'player 1'},
      black: {name: 'player 2'},
      result: null,
      handicap: 0
    });
  });

  it('should not deplete the original player array', () => {
    const players = [{
      name: 'player 1'
    }, {
      name: 'player 2'
    }, {
      name: 'player 3'
    }, {
      name: 'player 4'
    }];
    const pairing = createPairing(players);
    expect(players).to.have.length.of(4);
  });
});
