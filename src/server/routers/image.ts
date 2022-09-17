import { TRPCError } from '@trpc/server';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Photo } from '~server/models/photo';
import type { photoWithMemoryT } from '~types/photo/photo';
import { photoBaseWithIdZ, photoIdOnly } from '~types/photo/photo';

/**
 * Router for debug operations
 */
const imagesRouter = createProtectedDbRouter()
  .query('listImages', {
    async resolve({ ctx }) {
      const photos: photoWithMemoryT[] = await Photo.find({ userId: ctx.userId });
      return {
        photos,
      };
    },
  })

  .query('getImage', {
    input: photoIdOnly,
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
  })

  .mutation('UpdateImage', {
    input: photoBaseWithIdZ,
    async resolve({ ctx, input }) {
      const image: photoWithMemoryT | null = await Photo.findOneAndUpdate(
        { _id: input._id, userId: ctx.userId },
        { caption: input.caption, location: input.location, photoDate: input.photoDate },
        { returnDocument: 'after' },
      );

      if (!image) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Image to update was not found.',
        });
      }

      return { image };
    },
  });

export { imagesRouter };
