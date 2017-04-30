import KoaRouter from 'koa-router';
import {TournamentModel} from '../models/tournament';

const router = KoaRouter();

router.get('/tournaments', async (ctx, next) => {
  ctx.response.body = await TournamentModel.find();
});

router.post('/tournaments', async (ctx, next) => {
  const data = ctx.request.body;
  const tournament = new TournamentModel(data);

  const t = await tournament.save();

  ctx.response.body = t;
});

router.get('/tournaments/:tournamentId', async (ctx, next) => {
  ctx.response.body = ctx.tournament;
});

router.post('/tournaments/:tournamentId/players', async (ctx, next) => {
  const data = ctx.request.body;
  if (!data) {
    ctx.response.status = 400;
    return;
  }
  data.forEach((player) => {
    ctx.tournament.players.push(player);
  });
  const t = await ctx.tournament.save();
  ctx.response.body = t;
});

router.put('/tournaments/:tournamentId/players/:playerId', async (ctx, next) => {
  const data = ctx.request.body;
  const index = ctx.tournament.players.findIndex((player) => String(player._id) === ctx.params.playerId);
  if (index === -1) {
    ctx.response.status = 400;
    ctx.response.body = "Could not find player with id: " + ctx.params.playerId;
    return;
  }
  const player = ctx.tournament.players[index];
  if (player) {
    for (let key in data) {
      player[key] = data[key];
    }
  }
  ctx.tournament.players[index] = player;

  const t = await ctx.tournament.save();
  ctx.response.body = t;
});

router.delete('/tournaments/:tournamentId/players/:playerId', async (ctx, next) => {
  const index = ctx.tournament.players.findIndex((player) => String(player._id) === ctx.params.playerId);
  if (index === -1) {
    ctx.response.status = 400;
    ctx.response.body = "Could not find player with id: " + ctx.params.playerId;
    return;
  }
  ctx.tournament.players.splice(index, 1);

  const t = await ctx.tournament.save();
  ctx.response.body = t;
});

router.get('/tournaments/:tournamentId/players', async (ctx, next) => {
  ctx.response.body = ctx.tournament ? ctx.tournament.players : [];
});

export default router
