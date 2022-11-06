import { TRPCError } from '@trpc/server';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Collection } from '~server/models/collection';
import { Memory } from '~server/models/memory';
import type { collectionT } from '~types/collectionT';
import {
  collectionIdOnlyZ,
  collectionOmitIdZ,
  collectionSearchZ,
  collectionZ,
} from '~types/collectionT';

export { collectionRouter };

const collectionRouter = createProtectedDbRouter()
  .query('GetCollections', {
    input: collectionSearchZ,
    async resolve({ ctx, input }) {
      if (input?.text) {
        const collections: collectionT[] = await Collection.aggregate().search({
          compound: {
            filter: [
              {
                phrase: {
                  query: ctx.userId,
                  path: 'userId',
                },
              },
            ],
            should: [
              {
                autocomplete: {
                  query: input.text,
                  path: 'title',
                  score: {
                    boost: {
                      value: 3,
                    },
                  },
                },
              },
              {
                autocomplete: {
                  query: input.text,
                  path: 'description',
                  score: {
                    boost: {
                      value: 1,
                    },
                  },
                },
              },
            ],
            minimumShouldMatch: 1,
          },
        });

        return { collections };
      }

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

  .mutation('DeleteCollection', {
    input: collectionIdOnlyZ,
    async resolve({ ctx, input }) {
      await Memory.updateMany({}, { $pull: { collections: input._id } });
      await Collection.deleteOne({ _id: input._id, userId: ctx.userId });
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
