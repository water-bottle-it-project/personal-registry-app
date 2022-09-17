import { TRPCError } from '@trpc/server';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Photo } from '~server/models/photo';
import type { imageT } from '~types/image/image';
import { imageIdOnlyZ } from '~types/image/image';
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
    input: imageIdOnlyZ,
    async resolve({ ctx, input }) {
      const image = await Photo.findOne({
        _id: input._id,
        userId: ctx.userId,
      }); // findById('6308a49ab3b2b466112558ec');

      if (!image) {
        throw new TRPCError({
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
