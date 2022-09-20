import { TRPCError } from '@trpc/server';
import type { ObjectId } from 'mongoose';
import mongoose from 'mongoose';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Memory } from '~server/models/memory';
import { Photo } from '~server/models/photo';
import { collectionIdOnlyZ } from '~types/collection/collectionIdOnly';
import type {
  memoryCardT,
  memoryCreateFormRequestT,
  memoryEditFormRequestT,
  memoryWithPhotosT,
} from '~types/memory/memoryForm';
import {
  memoryCreateFormRequestZ,
  memoryEditFormRequestZ,
  memoryIdOnlyZ,
} from '~types/memory/memoryForm';
import type { photoWithIdT } from '~types/photo/photo';

const memoryRouter = createProtectedDbRouter()
  .query('GetMemories', {
    async resolve({ ctx }) {
      const memories: memoryCardT[] = await Memory.find(
        { userId: ctx.userId },
        { userId: 0 },
        { sort: { lastDate: -1 } },
      ).populate('collections', '-description -userId');

      return {
        memories,
      };
    },
  })

  .query('GetCollectionMemories', {
    input: collectionIdOnlyZ,
    async resolve({ ctx, input }) {
      const collectionId = new mongoose.Types.ObjectId(input._id);
      const memories: memoryCardT[] = await Memory.find(
        {
          userId: ctx.userId,
          collections: collectionId,
        },
        { userId: 0 },
        { sort: { lastDate: -1 } },
      ).populate('collections', '-description -userId');

      if (!memories) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Could not find memories using collection id.',
        });
      }

      return {
        memories,
      };
    },
  })

  .query('GetMemory', {
    input: memoryIdOnlyZ,
    async resolve({ ctx, input }) {
      const memory: memoryWithPhotosT | null = await Memory.findOne({
        _id: input._id,
        userId: ctx.userId,
      })
        .populate('photos')
        .populate('collections', '-description -userId')
        .exec();

      if (!memory) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not find memory by id.' });
      }

      return {
        memory,
      };
    },
  })

  .mutation('CreateMemory', {
    input: memoryCreateFormRequestZ,
    async resolve({ ctx, input }) {
      const memoryId = new mongoose.Types.ObjectId();

      const photosToInsert = input.photos.map(p => ({
        ...p,
        userId: ctx.userId,
        memoryId: memoryId,
        memoryDate: input.lastDate,
      }));

      const photosInserted = await Photo.insertMany(photosToInsert);
      const photoIdsInserted = photosInserted.map(p => p._id);

      const photoPreviewUrl: string | undefined = input.photos?.[0]?.url;

      const memory: memoryCreateFormRequestT = await Memory.create({
        _id: memoryId,
        title: input.title,
        description: input.description,
        firstDate: input.firstDate,
        lastDate: input.lastDate,
        userId: ctx.userId,
        photos: photoIdsInserted,
        photoPreviewUrl,
        collections: input.collections,
      });

      return memory;
    },
  })

  .mutation('UpdateMemory', {
    input: memoryEditFormRequestZ,
    async resolve({ ctx, input }) {
      // Get old photos in memory from database.
      const prev = await Memory.findOne(
        {
          _id: input._id,
          userId: ctx.userId,
        },
        { photos: 1 },
      );

      // Delete all previous photos data from database (not from Firebase yet).
      const deleteUrls: string[] = [];
      if (prev?.photos) {
        // Prepare for deletion of this memory's to-be-deleted photos
        const inputPhotoIds: string[] = input.photos.flatMap(p => (p._id ? p._id : []));
        const inputPhotoIdsSet: Set<string> = new Set(inputPhotoIds);
        const prevPhotoIds: string[] =
          prev?.photos?.map((p: { p: ObjectId }) => p.toString()) || [];

        const prevPhotosToDelete: string[] = prevPhotoIds.filter(p => !inputPhotoIdsSet.has(p));
        console.log(prevPhotosToDelete);

        const res: photoWithIdT[] = await Photo.find({ _id: { $in: prevPhotosToDelete } });
        console.log(res);

        // Delete photo data just from the database.
        await Photo.deleteMany({ _id: { $in: prev?.photos } });

        for (const p of res) {
          deleteUrls.push(p.url);
        }
      }

      // Insert photos of edited memory into database.
      const photosToInsert = input.photos.map(p => ({
        ...p,
        userId: ctx.userId,
        memoryId: input._id,
        memoryDate: input.lastDate,
      }));

      const photosInserted = await Photo.insertMany(photosToInsert);
      const photoIdsInserted = photosInserted.map(p => p._id);

      // Update memory (in overwrite mode to update photo preview url when going to n to 0 photos).
      const photoPreviewUrl: string | undefined = input.photos?.[0]?.url;

      const memory: memoryEditFormRequestT | null = await Memory.findByIdAndUpdate(
        input._id,
        {
          title: input.title,
          description: input.description,
          firstDate: input.firstDate,
          lastDate: input.lastDate,
          userId: ctx.userId,
          photos: photoIdsInserted,
          photoPreviewUrl,
          collections: input.collections,
        },
        { overwrite: true },
      );

      if (!memory) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not find memory ID to edit' });
      }

      // Delete photos client-side (a bit easier, if silly - Firebase Admin SDK doesn't easily
      // support getting a ref from a download URL, only the client JS SDK supports it :/)
      console.log(deleteUrls);
      return deleteUrls;
    },
  });

export { memoryRouter };
