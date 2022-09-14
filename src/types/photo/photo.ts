import { z } from 'zod';

import { objectIdZ } from '~types/util/objectId';
import { urlZ } from '~types/util/url';

/**
 * Building blocks
 */
const photoBase = z.object({
  caption: z.string().trim().optional(),
  location: z.string().trim().optional(),
  photoDate: z.date().nullable(),
});

/**
 * Photo types used in the app.
 */
// The photo as part of a create form - used for input and validation.
// _file is any for now (File type is not supported in Node.js, only in the browser).
const photoFormCreateZ = photoBase.extend({
  _file: z.any(),
  _dir: z.string(),
  _thumbnail: z.string(),
});

// Gets combined with form create request.
const photoFormCreateRequestZ = photoBase.extend({
  url: urlZ,
});

const photoFormEditZ = photoBase.extend({
  _file: z.any().optional(),
  _dir: z.string(),
  _thumbnail: z.string().optional(),
  _id: objectIdZ.optional(),
  url: urlZ.optional(),
});

const photoFormEditRequestZ = photoBase.extend({
  _id: objectIdZ.optional(),
  url: urlZ,
});

// Gets combined with memory to return a single memory with all the photos populated.
const photoWithIdZ = photoBase.extend({
  url: urlZ,
  _id: objectIdZ,
});

const photoIdOnly = z.object({
  _id: objectIdZ,
});

type photoFormCreateT = z.infer<typeof photoFormCreateZ>;
type photoFormCreateRequestT = z.infer<typeof photoFormCreateRequestZ>;
type photoWithIdT = z.infer<typeof photoWithIdZ>;
type photoIdOnlyT = z.infer<typeof photoIdOnly>;
type photoFormEditT = z.infer<typeof photoFormEditZ>;
type photoFormEditRequestT = z.infer<typeof photoFormEditRequestZ>;

export type {
  photoFormCreateRequestT,
  photoFormCreateT,
  photoFormEditRequestT,
  photoFormEditT,
  photoIdOnlyT,
  photoWithIdT,
};
export {
  photoFormCreateRequestZ,
  photoFormCreateZ,
  photoFormEditRequestZ,
  photoFormEditZ,
  photoIdOnly,
  photoWithIdZ,
};
