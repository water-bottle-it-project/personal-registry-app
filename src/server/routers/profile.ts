import { getFirebaseAdmin } from 'next-firebase-auth';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Collection } from '~server/models/collection';
import { Memory } from '~server/models/memory';
import { Photo } from '~server/models/photo';

/**
 * Router for profile management operations
 */
const profileRouter = createProtectedDbRouter().mutation('DeleteUser', {
  async resolve({ ctx }) {
    await Collection.deleteMany({ userId: ctx.userId });
    await Memory.deleteMany({ userId: ctx.userId });

    await Photo.deleteMany({ userId: ctx.userId });
    const admin = getFirebaseAdmin();
    const bucket_path = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (bucket_path) {
      const bucket = admin.storage().bucket(`gs://${bucket_path}`);
      await bucket.deleteFiles({
        prefix: `${ctx.userId}/`,
      });
    }
  },
});

export { profileRouter };
