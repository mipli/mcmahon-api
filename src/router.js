import combineRouters from 'koa-combine-routers';
import playerRoutes from './routes/players';
import roundsRoutes from './routes/rounds';
import tournamentsRoutes from './routes/tournaments';

const router = combineRouters([
  tournamentsRoutes,
  playerRoutes,
  roundsRoutes
]);

export default router;
