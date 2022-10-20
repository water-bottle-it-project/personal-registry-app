import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Photo } from '~server/models/photo';
import type { photosPaginatedT, photoWithIdT } from '~types/photo/photo';
import { paginationInputZ } from '~types/util/pagination';

/**
 * Router for debug operations
 */
const photosRouter = createProtectedDbRouter()
  .query('GetPhotos', {
    async resolve({ ctx }) {
      const photos: photoWithIdT[] = await Photo.find(
        { userId: ctx.userId },
        { userId: 0 },
        { sort: { memoryDate: -1 } },
      );
      return {
        photos,
      };
    },
  })

  .query('GetPhotosPaginated', {
    input: paginationInputZ,
    async resolve({ ctx, input }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const photos: photosPaginatedT = await Photo.paginate(
        { userId: ctx.userId },
        {
          page: input.page,
          limit: 36,
          projection: { userId: 0 },
          sort: { memoryDate: -1 },
        },
      );

      return photos;
    },
  });

export { photosRouter };
