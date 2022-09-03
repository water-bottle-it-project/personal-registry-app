import { TRPCError } from '@trpc/server';
import type { MiddlewareFunction } from '@trpc/server/src/internals/middlewares';

import type { Context } from '~server/context';

const authReqHandler: MiddlewareFunction<Context, Context, any> = ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
};

export { authReqHandler };
