import { z } from 'zod';

import { photoFormCreateRequestZ, photoFormCreateZ, photoWithIdZ } from '~types/photo/photo';
import { objectIdZ } from '~types/util/objectId';
import { urlZ } from '~types/util/url';

/**
 * Building blocks
 */
const memoryBase = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
});

const dateTuple = z.object({
  date: z.tuple([z.date(), z.date()]),
});

const dateSeparate = z.object({
  firstDate: z.date(),
  lastDate: z.date(),
});

/**
 * Types to be used across the app.
 */
// Form validation
const memoryCreateFormZ = memoryBase.merge(dateTuple).extend({
  photos: photoFormCreateZ.array().default([]),
});

// Actual create request sent to server
const memoryCreateFormRequestZ = memoryBase.merge(dateSeparate).extend({
  photos: photoFormCreateRequestZ.array().default([]),
});

const memoryIdOnlyZ = z.object({
  _id: objectIdZ,
});

// For memory/timeline cards
const memoryCardZ = memoryBase.merge(dateSeparate).extend({
  _id: objectIdZ,
  photoPreviewUrl: urlZ.nullish(),
});

// For viewing a single memory
const memoryWithPhotosZ = memoryBase.merge(dateSeparate).extend({
  _id: objectIdZ,
  photos: photoWithIdZ.array().default([]),
});

/**
 * Inferred types
 */
type memoryCardT = z.infer<typeof memoryCardZ>;
type memoryCreateFormT = z.infer<typeof memoryCreateFormZ>;
type memoryCreateFormRequestT = z.infer<typeof memoryCreateFormRequestZ>;
type memoryIdOnlyT = z.infer<typeof memoryIdOnlyZ>;
type memoryWithPhotosT = z.infer<typeof memoryWithPhotosZ>;

/**
 * Exports
 */
export type {
  memoryCardT,
  memoryCreateFormRequestT,
  memoryCreateFormT,
  memoryIdOnlyT,
  memoryWithPhotosT,
};
export {
  memoryCardZ,
  memoryCreateFormRequestZ,
  memoryCreateFormZ,
  memoryIdOnlyZ,
  memoryWithPhotosZ,
};
