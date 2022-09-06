import * as trpc from '@trpc/server';
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
    // input: z.object({
    //   _id: z.string().min(1),
    // }),
    async resolve({ ctx }) {
      const image = await Photo.findOne({
        _id: '6308a49ab3b2b466112558ec',
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
  });

export { imagesRouter };
