import { TRPCError } from '@trpc/server';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Photo } from '~server/models/photo';
import type { photoWithMemoryT } from '~types/photo/photo';
import { photoBaseWithIdZ, photoIdOnly } from '~types/photo/photo';

/**
 * Router for debug operations
 */
const imagesRouter = createProtectedDbRouter().query('listImages', {
  async resolve({ ctx }) {
    const photos: photoWithMemoryT[] = await Photo.find({ userId: ctx.userId });
    return {
      photos,
    };
  },
});

export { imagesRouter };
