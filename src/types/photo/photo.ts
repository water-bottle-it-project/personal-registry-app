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

const photoDims = z.object({
  height: z.number(),
  width: z.number(),
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
const photoFormCreateRequestZ = photoBase.merge(photoDims).extend({
  url: urlZ,
});

const photoFormEditZ = photoBase.merge(photoDims.partial()).extend({
  _file: z.any().optional(),
  _dir: z.string(),
  _thumbnail: z.string().optional(),
  _id: objectIdZ.optional(),
  url: urlZ.optional(),
});

const photoFormEditRequestZ = photoBase.merge(photoDims).extend({
  _id: objectIdZ.optional(),
  url: urlZ,
});

// Gets combined with memory to return a single memory with all the photos populated.
const photoWithIdZ = photoBase.merge(photoDims).extend({
  url: urlZ,
  _id: objectIdZ,
  memoryId: objectIdZ,
  memoryDate: z.date(),
});

const photoSearchZ = z
  .object({
    text: z.string().trim().min(1).max(100),
  })
  .required();

type photoFormCreateT = z.infer<typeof photoFormCreateZ>;
type photoFormCreateRequestT = z.infer<typeof photoFormCreateRequestZ>;
type photoWithIdT = z.infer<typeof photoWithIdZ>;
type photoFormEditT = z.infer<typeof photoFormEditZ>;
type photoFormEditRequestT = z.infer<typeof photoFormEditRequestZ>;
type photoSearchT = z.infer<typeof photoSearchZ>;

export type {
  photoFormCreateRequestT,
  photoFormCreateT,
  photoFormEditRequestT,
  photoFormEditT,
  photoSearchT,
  photoWithIdT,
};
export {
  photoFormCreateRequestZ,
  photoFormCreateZ,
  photoFormEditRequestZ,
  photoFormEditZ,
  photoSearchZ,
  photoWithIdZ,
};
