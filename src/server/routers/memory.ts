import { TRPCError } from '@trpc/server';
import mongoose from 'mongoose';

import { createProtectedDbRouter } from '~server/createProtectedDbRouter';
import { Memory } from '~server/models/memory';
import { Photo } from '~server/models/photo';
import type { memoryT } from '~types/memory/memory';
import { memoryIdOnlyZ } from '~types/memory/memory';
import { memoryCreateFormRequest } from '~types/memory/memoryForm';

const memoryRouter = createProtectedDbRouter()
  .query('GetMemories', {
    async resolve({ ctx }) {
      const memories: memoryT[] = await Memory.find({ userId: ctx.userId }, { userId: 0 });

      return {
        memories,
      };
    },
  })

  .query('GetMemory', {
    input: memoryIdOnlyZ,
    async resolve({ ctx, input }) {
      const memory: memoryT | null = await Memory.findOne({
        _id: input._id,
        userId: ctx.userId,
      });

      if (!memory) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Could not find memory by id.' });
      }

      return {
        memory,
      };
    },
  })

  .mutation('CreateMemory', {
    input: memoryCreateFormRequest,
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

      const memory: memoryT = await Memory.create({
        _id: memoryId,
        title: input.title,
        description: input.description,
        firstDate: input.firstDate,
        lastDate: input.lastDate,
        userId: ctx.userId,
        photos: photoIdsInserted,
      });

      return memory;
    },
  });

export { memoryRouter };
