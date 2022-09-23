import { z } from 'zod';

import { collectionMemory2Z } from '~types/collection/collection';
import {
  photoFormCreateRequestZ,
  photoFormCreateZ,
  photoFormEditRequestZ,
  photoFormEditZ,
  photoWithIdZ,
} from '~types/photo/photo';
import { objectIdZ } from '~types/util/objectId';
import { paginationWrapperZ } from '~types/util/pagination';
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
  collections: objectIdZ.array().default([]),
});

// Actual create request sent to server
const memoryCreateFormRequestZ = memoryBase.merge(dateSeparate).extend({
  photos: photoFormCreateRequestZ.array().default([]),
  collections: objectIdZ.array().default([]),
});

const memoryEditFormZ = memoryBase.merge(dateTuple).extend({
  _id: objectIdZ,
  photos: photoFormEditZ.array().default([]),
  collections: objectIdZ.array().default([]),
});

const memoryEditFormRequestZ = memoryBase.merge(dateSeparate).extend({
  _id: objectIdZ,
  photos: photoFormEditRequestZ.array().default([]),
  collections: objectIdZ.array().default([]),
});

// For querying a single memory.
const memoryIdOnlyZ = z.object({
  _id: objectIdZ,
});

// For memory/timeline cards
const memoryCardZ = memoryBase.merge(dateSeparate).extend({
  _id: objectIdZ,
  photoPreviewUrl: urlZ.optional(),
  photos: objectIdZ.array().default([]),
  collections: collectionMemory2Z.array().default([]),
});

// For a paged list of memory cards
const memoriesPaginated = paginationWrapperZ.extend({
  docs: memoryCardZ.array().default([]),
});

// For viewing a single memory
const memoryWithPhotosZ = memoryBase.merge(dateSeparate).extend({
  _id: objectIdZ,
  photos: photoWithIdZ.array().default([]),
  collections: collectionMemory2Z.array().default([]),
});

// For getting memory details with photos to edit
const memoryWithPhotosToEditZ = memoryBase.merge(dateTuple).extend({
  _id: objectIdZ,
  photos: photoWithIdZ.array().default([]),
  collections: objectIdZ.array().default([]),
});

/**
 * Inferred types
 */
type memoryCardT = z.infer<typeof memoryCardZ>;
type memoryCreateFormT = z.infer<typeof memoryCreateFormZ>;
type memoryCreateFormRequestT = z.infer<typeof memoryCreateFormRequestZ>;
type memoryIdOnlyT = z.infer<typeof memoryIdOnlyZ>;
type memoryWithPhotosT = z.infer<typeof memoryWithPhotosZ>;
type memoriesPaginatedT = z.infer<typeof memoriesPaginated>;

type memoryEditFormRequestT = z.infer<typeof memoryEditFormRequestZ>;
type memoryEditFormT = z.infer<typeof memoryEditFormZ>;
type memoryWithPhotosToEditT = z.infer<typeof memoryWithPhotosToEditZ>;

/**
 * Exports
 */
export type {
  memoriesPaginatedT,
  memoryCardT,
  memoryCreateFormRequestT,
  memoryCreateFormT,
  memoryEditFormRequestT,
  memoryEditFormT,
  memoryIdOnlyT,
  memoryWithPhotosT,
  memoryWithPhotosToEditT,
};
export {
  memoryCardZ,
  memoryCreateFormRequestZ,
  memoryCreateFormZ,
  memoryEditFormRequestZ,
  memoryEditFormZ,
  memoryIdOnlyZ,
  memoryWithPhotosZ,
};
