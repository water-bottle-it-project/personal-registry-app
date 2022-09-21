import { TRPCError } from '@trpc/server';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Collection } from '~server/models/collection';
import { Memory } from '~server/models/memory';
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
      )
        .collation({ locale: 'en', strength: 2 })
        .sort({ title: 1 });

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
      await Memory.updateMany({}, { $pull: { collections: input._id } });
      await Collection.deleteOne({ _id: input._id, userId: ctx.userId });
    },
  })

  .mutation('DeleteAllCollection', {
    async resolve({ ctx }) {
      await Collection.deleteMany({ userId: ctx.userId });
    },
  })

  .mutation('UpdateCollection', {
    input: collectionZ,
    async resolve({ ctx, input }) {
      let collection: collectionT | null = null;
      try {
        collection = await Collection.findOneAndUpdate(
          { _id: input._id, userId: ctx.userId },
          { title: input.title, description: input.description, color: input.color },
          { returnDocument: 'after' },
        );
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Collection with title ${input.title} already exists.
          Collection title must be unique (ignores case).`,
        });
      }

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
      try {
        const collection: collectionT = await Collection.create({
          title: input.title,
          color: input.color,
          description: input.description,
          userId: ctx.userId,
        });

        return collection;
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Collection with title ${input.title} already exists.
          Collection title must be unique (ignores case).`,
        });
      }
    },
  });
