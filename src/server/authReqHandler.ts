import { TRPCError } from '@trpc/server';
import type { MiddlewareFunction } from '@trpc/server/src/internals/middlewares';

import type { Context } from '~server/context';

const authReqHandler: MiddlewareFunction<any, Context, any> = ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
};

export { authReqHandler };
