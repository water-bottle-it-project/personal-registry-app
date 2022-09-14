import { TRPCError } from '@trpc/server';
import mongoose from 'mongoose';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Memory } from '~server/models/memory';
import { Photo } from '~server/models/photo';
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

const memoryRouter = createProtectedDbRouter()
  .query('GetMemories', {
    async resolve({ ctx }) {
      const memories: memoryCardT[] = await Memory.find(
        { userId: ctx.userId },
        { userId: 0 },
        { sort: { lastDate: -1 } },
      );

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
      if (prev?.photos) {
        await Photo.deleteMany({ _id: { $in: prev?.photos } });
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
        },
        { overwrite: true },
      );

      if (!memory) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not find memory ID to edit' });
      }

      return memory;
    },
  });

export { memoryRouter };
