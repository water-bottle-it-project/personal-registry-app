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
      const users = await User.find();
      return {
        users,
      };
    },
  })

  .mutation('createUser', {
    async resolve() {
      console.log('createUserTest');
      const newUser = await User.create({
        _id: 'debug1',
        email: 'debug1@debug.com',
        createdTimestamp: new Date(),
        username: 'debug1username',
      });
      console.log(newUser);
      return {
        user: newUser,
      };
    },
  })

  .mutation('deleteUser', {
    async resolve() {
      const result = await User.deleteOne({ email: 'debug1@debug.com' });
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
