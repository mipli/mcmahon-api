import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import KoaRouter from 'koa-router';
import {TournamentModel} from './models/tournament';

import router from './router';

const app = new Koa()
  .use(cors())
  .use(bodyParser())
  .use(async (ctx, next) => {
    const parts = ctx.request.url.split('/');
    if (parts[1] === 'tournaments' && parts[2] && parts[2].match(/^[a-zA-Z0-9]+$/)) {
      ctx.tournament = await TournamentModel.findOne({_id: parts[2]});
    }

    await next();
  })
  .use(router);

export default app;
