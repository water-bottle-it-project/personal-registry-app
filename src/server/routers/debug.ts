import * as trpc from '@trpc/server';

import { dbReqHandler } from '~server/db/dbReqHandler';
import { User } from '~server/models/user';

/**
 * Router for debug operations
 */
const debugRouter = trpc
  .router()

  .middleware(dbReqHandler)

  .query('listUsers', {
    async resolve() {
      const users = await User.find({});
      return {
        users,
      };
    },
  })

  .mutation('createUser', {
    async resolve() {
      const newUser = await User.create({
        _id: 'debug1',
        email: 'debug1@debug.com',
        created_timestamp: new Date(),
        username: 'debug1username',
      });
      return {
        user: newUser,
      };
    },
  })

  .mutation('deleteUser', {
    async resolve() {
      const result = await User.deleteOne({ _id: 'debug1' });
      if (result.deletedCount == 0) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'User _id not found.',
        });
      }
      return {
        success: true,
      };
    },
  });

export { debugRouter };
