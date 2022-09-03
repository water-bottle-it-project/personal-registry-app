import * as trpc from '@trpc/server';
import { z } from 'zod';

import { dbReqHandler } from '~server/db/dbReqHandler';
import { Collection } from '~server/models/collection';
import { editCollectionZ } from '~types/editCollection';

/**
 * Router for debug operations
 */
const collectionsRouter = trpc
  .router()

  .middleware(dbReqHandler)

  .query('listCollections', {
    input: z
      .object({
        name: z.string().nullish(),
      })
      .default({ name: 'World' }),
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
    input: z.object({
      title: z.string().nullish(),
      userId: z.string(),
    }),
    async resolve({ input }) {
      const toRemove = { title: input.title, userId: input.userId };
      const result = await Collection.deleteOne(toRemove);
      if (result.deletedCount == 0) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Collection failed to be deleted.',
        });
      }
      return {
        success: true,
      };
    },
  })

  .mutation('editCollection', {
    input: editCollectionZ,
    async resolve({ input }) {
      const toUpdate = { title: input.oldTitle, userId: input.userId };
      const newValues = {
        $set: { title: input.title, description: input.description, color: input.color },
      };
      const result = await Collection.updateOne(toUpdate, newValues);
      if (result.matchedCount == 0) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Collection not found.',
        });
      }
      if (result.modifiedCount == 0) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Collection not updated.',
        });
      }
    },
  });

export { collectionsRouter };
