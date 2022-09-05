import * as trpc from '@trpc/server';

import { createUnauthedDbRouter } from '~server/createUnauthedDbRouter';
import { Photo } from '~server/models/photo';

/**
 * Router for debug operations
 */
const imagesRouter = createUnauthedDbRouter()
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
        caption: 'sus',
        url: 'gs://register-app-40207.appspot.com/debug1/childhood.jpeg',
        userId: 'debug1',
        memoryId: 'mem123',
        memoryDate: 'ytdy',
      });
      return {
        user: newImage,
      };
    },
  })

  .mutation('removeImage', {
    async resolve() {
      const result = await Photo.deleteOne({ caption: 'sus' });
      if (result.deletedCount == 0) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'User _id not found.',
        });
      }
      return {
        success: true,
      };
    },
  });

export { imagesRouter };
