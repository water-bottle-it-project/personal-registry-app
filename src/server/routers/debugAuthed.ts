import { TRPCError } from '@trpc/server';

import { authReqHandler } from '~server/authReqHandler';
import { createRouter } from '~server/createRouter';

const debugAuthedRouter = createRouter()
  .middleware(authReqHandler)
  .query('getAuthedDebug', {
    resolve({ ctx }) {
      return {
        result: 12345,
      };
    },
  });

export { debugAuthedRouter };
