import { TRPCError } from '@trpc/server';

import { createRouter } from '~server/createRouter';
import { dbConnect } from '~server/db/dbConnect';

export function createProtectedDbRouter() {
  return createRouter()
    .middleware(async ({ ctx, next }) => {
      if (!ctx.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // user must be non-null, so rewrite ctx object
      return next({
        ctx: {
          ...ctx,
          userId: ctx.userId,
        },
      });
    })
    .middleware(async ({ next }) => {
      await dbConnect();
      return next();
    });
}
