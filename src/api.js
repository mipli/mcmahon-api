import KoaRouter from 'koa-router';

const api = KoaRouter();

function foo(ctx, next) {
}
api.get('/', foo);
/*
api.post('/:collection', validateKey, validateCollection, async (ctx, next) => {
  const { collection  } = ctx.params;
  const count = await ctx.state.collections[collection].add(ctx.request.body);

  ctx.status = 201;
});
*/

const validateCollection = async (ctx, next) => {
  const { collection } = ctx.params;
  if (!(collection in ctx.state.collections)) {
    return ctx.throw(404);
  }
  await next();
}

const validateKey = async (ctx, next) => {
  const { authorization } = ctx.request.headers;
  if (authorization !== ctx.state.authorizationHeader) {
    return ctx.throw(401);
  }
  await next();
}

export default api;
