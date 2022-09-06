import * as trpc from '@trpc/server';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Photo } from '~server/models/photo';
import type { imageT } from '~types/image/image';
import { imageZ } from '~types/image/image';

/**
 * Router for debug operations
 */
const imagesRouter = createProtectedDbRouter().query('listImages', {
  async resolve({ ctx }) {
    const photos: imageT[] = await Photo.find({ userId: ctx.userId });
    return {
      photos,
    };
  },
});

export { imagesRouter };
