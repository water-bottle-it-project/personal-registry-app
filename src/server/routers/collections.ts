import * as trpc from '@trpc/server';

import { dbReqHandler } from '~server/db/dbReqHandler';
import { Collection } from '~server/models/collection';

/**
 * Router for debug operations
 */
const collectionsRouter = trpc
  .router()

  .middleware(dbReqHandler)

  .query('listCollections', {
    async resolve() {
      const collections = await Collection.find();
      return {
        collections,
      };
    },
  })

  .mutation('AddCollection', {
    async resolve() {
      const newCollection = await Collection.create({
        title: 'Family',
        userId: 'debug1',
        description: '"Family"- Vin Diesel',
        color: 'blue',
      });
      return {
        user: newCollection,
      };
    },
  })

  .mutation('removeCollection', {
    async resolve() {
      const result = await Collection.deleteOne({ title: 'family' });
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

export { collectionsRouter };
