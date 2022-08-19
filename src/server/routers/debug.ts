import * as trpc from '@trpc/server';

import { dbConnect } from '~server/db/dbConnect';
import { User } from '~server/db/userModel';

/**
 * Router for debug operations
 */
const debugRouter = trpc
  .router()

  .query('listUsers', {
    async resolve() {
      await dbConnect();
      const users = await User.find({});
      console.log(users);
      return {
        users,
      };
    },
  })

  .mutation('createUser', {
    async resolve() {
      await dbConnect();
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
      await dbConnect();

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
