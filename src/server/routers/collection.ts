import { TRPCError } from '@trpc/server';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Collection } from '~server/models/collection';
import type { collectionT } from '~types/collection/collection';
import { collectionZ } from '~types/collection/collection';
import { collectionIdOnlyZ } from '~types/collection/collectionIdOnly';
import { collectionOmitIdZ } from '~types/collection/collectionOmitId';
import { collectionSearchZ } from '~types/collection/collectionSearch';

export { collectionRouter };

const collectionRouter = createProtectedDbRouter()
  .query('GetCollections', {
    async resolve({ ctx }) {
      const collections: collectionT[] = await Collection.find(
        { userId: ctx.userId },
        { userId: 0 },
        { sort: { title: 1 } },
      );

      return {
        collections,
      };
    },
  })

  .query('GetCollection', {
    input: collectionIdOnlyZ,
    async resolve({ ctx, input }) {
      const collection: collectionT | null = await Collection.findOne({
        _id: input._id,
        userId: ctx.userId,
      });

      if (!collection) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not find collection by id.' });
      }

      return {
        collection,
      };
    },
  })

  .query('SearchCollections', {
    input: collectionSearchZ,
    async resolve({ ctx, input }) {
      let collections: collectionT[] = [];
      const re = new RegExp(`${input.text}`, 'i');
      if (input.searchType === 'title') {
        collections = await Collection.find({
          title: re,
          userId: ctx.userId,
        });
      } else if (input.searchType === 'description') {
        collections = await Collection.find({
          description: re,
          userId: ctx.userId,
        });
      }

      if (!collections) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not find collection by id.' });
      }

      return {
        collections,
      };
    },
  })

  .mutation('DeleteCollection', {
    input: collectionIdOnlyZ,
    async resolve({ ctx, input }) {
      await Collection.deleteOne({ _id: input._id, userId: ctx.userId });
    },
  })

  .mutation('UpdateCollection', {
    input: collectionZ,
    async resolve({ ctx, input }) {
      const collection: collectionT | null = await Collection.findOneAndUpdate(
        { _id: input._id, userId: ctx.userId },
        { title: input.title, description: input.description, color: input.color },
        { returnDocument: 'after' },
      );

      if (!collection) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Collection to update was not found.',
        });
      }

      return { collection };
    },
  })

  .mutation('CreateCollection', {
    input: collectionOmitIdZ,
    async resolve({ ctx, input }) {
      const collection: collectionT = await Collection.create({
        title: input.title,
        color: input.color,
        description: input.description,
        userId: ctx.userId,
      });

      return collection;
    },
  });
