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

export default router
