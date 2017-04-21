import KoaRouter from 'koa-router';
import PlayerModel from '../models/player';
import {RoundModel} from '../models/round';
import {TournamentModel} from '../models/tournament';

import * as Pairer from '../lib/Pairer';

const router = KoaRouter();

router.prefix('/tournaments/:tournamentId');

router.get('/rounds', async (ctx, next) => {
  ctx.response.body = ctx.tournament.rounds;
});

router.get('/rounds/current', async (ctx, next) => {
  ctx.response.body = ctx.tournament.rounds.pop();
});

router.get('/rounds/draw', async (ctx, next) => {
  const rounds = ctx.tournament.rounds;
  const lastRound = rounds.length > 0 ? rounds[rounds.length - 1] : null;

  if (lastRound && !lastRound.finished) {
    ctx.response.status = 400;
    ctx.response.body = {message: 'Previous round has not finished'};
    return;
  }

  const players = await PlayerModel.find();
  const pairings = Pairer.createPairing(players);

  const round = new RoundModel({
    number: lastRound ? lastRound.number + 1 : 1,
    finished: false,
    pairings: pairings
  });

  ctx.tournament.rounds.push(round);
  await ctx.tournament.save();

  ctx.response.body = ctx.tournament.rounds;
});

router.get('/rounds/redraw', async (ctx, next) => {
  const rounds = ctx.tournament.rounds;
  const lastRound = rounds.length > 0 ? rounds[rounds.length - 1] : null;

  if (!lastRound) {
    ctx.response.status = 400;
    ctx.response.body = {message: 'Cannot redraw something that doesn\'t exist'};
    return;
  }

  const players = await PlayerModel.find();
  const pairings = Pairer.createPairing(players);

  const round = new RoundModel({
    number: lastRound.number,
    finished: false,
    pairings: pairings
  });

  ctx.tournament.rounds.pop();
  ctx.tournament.rounds.push(round);
  await ctx.tournament.save();

  ctx.response.body = ctx.tournament.rounds;
});

router.put('/rounds/:roundId/pairing/:pairingId', async (ctx, next) => {
  const round = ctx.tournament.rounds.find((r) => r._id == ctx.params.roundId);
  const pairing = round.pairings.find((p) => p._id == ctx.params.pairingId);

  if (typeof ctx.request.body.result !== 'undefined') {
    pairing.result = ctx.request.body.result
  }
  if (typeof ctx.request.body.handicap !== 'undefined') {
    pairing.handicap = ctx.request.body.handicap
  }

  if (round.pairings.every((p) => p.result !== null)) {
    round.finished = true;
  } else {
    round.finished = false;
  }

  ctx.tournament.save();
  ctx.response.body = ctx.tournament.rounds;

});

export default router;
