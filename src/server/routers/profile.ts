import * as trpc from '@trpc/server';

import { createRouter } from '~server/createRouter';
import { dbReqHandler } from '~server/db/dbReqHandler';
import { User } from '~server/models/user';

/**
 * Router for profile management operations
 */
const profileRouter = trpc
  .router()
  .middleware(dbReqHandler)

  .query('listUsers', {
    async resolve() {
      const user = await User.find();
      return {
        user,
      };
    },
  });

export { profileRouter };
