import { TRPCError } from '@trpc/server';

import { createRouter } from '~server/createRouter';

const debugAuthedRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .query('getAuthedDebug', {
    resolve() {
      return {
        result: 12345,
      };
    },
  });

export { debugAuthedRouter };
