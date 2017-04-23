import KoaRouter from 'koa-router';
import PlayerModel from '../models/player';

const router = KoaRouter();

router.post('/players', async (ctx, next) => {
  const data = ctx.request.body;
  const player = new PlayerModel(data);

  const newPlayer = await player.save();

  if (ctx.tournament) {
    ctx.tournament.players.push(newPlayer);
    await ctx.tournament.save();
  }

  ctx.response.body = newPlayer;
});

router.put('/players/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const data = ctx.request.body;
  const player = await PlayerModel.findOne({_id: id});
  if (!player) {
    ctx.response.status = 404;
    return;
  }
  const status = await player.update(data);
  if (!status.ok) {
    ctx.response.status = 500;
    console.error(status);
    return;
  }

  const updatedPlayer = await PlayerModel.findOne({_id: id});

  ctx.response.body = updatedPlayer;
});

router.get('/players', async (ctx, next) => {
  let query = null;
  if (Object.keys(ctx.query).length > 0) {
    query = {};
    if (ctx.query.name) {
      query.name = new RegExp(ctx.query.name, 'i');
    }
    if (ctx.query.rank) {
      query.rank = ctx.query.rank;
    }
  }

  const players = await PlayerModel.find(query);

  ctx.response.body = players;
});


router.get('/players/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const player = await PlayerModel.findOne({_id: id});
  ctx.response.body = player;
});


router.delete('/players/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const ret = await PlayerModel.remove({_id: id});
  if (ret.result && ret.result.ok === 1) {
    ctx.response.body = {status: 'OK'}
  } else {
    ctx.response.status = 400;
    ctx.response.body = {status: 'ERROR'}
  }
});

export default router;
