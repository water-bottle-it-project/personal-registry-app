import { TRPCError } from '@trpc/server';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Photo } from '~server/models/photo';
import type { photoWithIdT } from '~types/photo/photo';
import { photoSearchZ } from '~types/photo/photo';

/**
 * Router for debug operations
 */
const photosRouter = createProtectedDbRouter()
  .query('GetPhotos', {
    async resolve({ ctx }) {
      const photos: photoWithIdT[] = await Photo.find(
        { userId: ctx.userId },
        {},
        { sort: { memoryDate: -1 } },
      );
      return {
        photos,
      };
    },
  })

  .query('SearchPhotos', {
    input: photoSearchZ,
    async resolve({ ctx, input }) {
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
      if (!photos) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not find collection by id.' });
      }
      return {
        photos,
      };
    },
  });

export { photosRouter };
