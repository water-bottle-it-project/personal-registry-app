import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Photo } from '~server/models/photo';
import type { photoWithIdT } from '~types/photo/photo';

/**
 * Router for debug operations
 */
const photosRouter = createProtectedDbRouter().query('GetPhotos', {
  async resolve({ ctx }) {
    const photos: photoWithIdT[] = await Photo.find({ userId: ctx.userId });
    return {
      photos,
    };
  },
});

export { photosRouter };
