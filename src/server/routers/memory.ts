import { TRPCError } from '@trpc/server';
import mongoose from 'mongoose';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Memory } from '~server/models/memory';
import { Photo } from '~server/models/photo';
import type {
  memoryCardT,
  memoryCreateFormRequestT,
  memoryWithPhotosT,
} from '~types/memory/memoryForm';
import { memoryCreateFormRequestZ, memoryIdOnlyZ } from '~types/memory/memoryForm';

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

      const photoPreviewUrl = input.photos && input.photos[0].url;

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
  });

export { memoryRouter };
