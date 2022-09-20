import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { resolve } from 'path';
import { string } from 'zod';
import { z } from 'zod';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Photo } from '~server/models/photo';
import { collectionZ } from '~types/collection/collection';
import type { imageT } from '~types/image/image';

/**
 * Router for debug operations
 */
const imagesRouter = createProtectedDbRouter()
  .query('listImages', {
    async resolve({ ctx }) {
      const photos: imageT[] = await Photo.find({ userId: ctx.userId });
      return {
        photos,
      };
    },
  })

  .query('getImage', {
    input: z.object({
      _id: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      const image = await Photo.findOne({
        _id: input._id,
        userId: ctx.userId,
      }); // findById('6308a49ab3b2b466112558ec');

      if (!image) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Image not found by ID.',
        });
      }

      return {
        image,
      };
    },
  })

  .query('SearchImages', {
    input: z
      .object({
        text: z.string().trim().min(1).max(100),
      })
      .required(),
    async resolve({ ctx, input }) {
      // const images = [];
      // const re = new RegExp(`${input.text}`, 'i');
      // if (input.searchType === 'title') {
      //   images = await Photo.find({
      //   title: re,
      //   userId: ctx.userId,
      // });
      // } else if (input.searchType === 'description') {
      //   collections = await Collection.find({
      //     description: re,
      //     userId: ctx.userId,
      //   });
      // }

      try {
        const photos = await Photo.aggregate([
          {
            $search: {
              autocomplete: {
                query: `${input.text}`,
                path: 'caption',
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 3,
                },
              },
            },
          },
        ]);
        return {
          photos,
        };
      } catch (e) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not find collection by id.' });
      }
    },
  });

export { imagesRouter };
