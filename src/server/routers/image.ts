import * as trpc from '@trpc/server';

import { dbReqHandler } from '~server/db/dbReqHandler';
import { Photo } from '~server/models/photo';

/**
 * Router for debug operations
 */
const imagesRouter = trpc
  .router()

  .middleware(dbReqHandler)

  .query('listImages', {
    async resolve() {
      const photos = await Photo.find();
      return {
        photos,
      };
    },
  })

  .mutation('AddImage', {
    async resolve() {
      const newImage = await Photo.create({
        url: 'kian',
        userId: '123',
        memoryId: 'mem123',
        memoryDate: 'ytdy',
      });
      return {
        user: newImage,
      };
    },
  });

// .mutation('removeImage', {
//   async resolve() {
//     const result = await Photo.deleteOne({ email: 'debug1@debug.com' });
//     if (result.deletedCount == 0) {
//       throw new trpc.TRPCError({
//         code: 'BAD_REQUEST',
//         message: 'User _id not found.',
//       });
//     }
//     return {
//       success: true,
//     };
//   },
// });

export { imagesRouter };
