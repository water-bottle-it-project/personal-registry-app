import { z } from 'zod';

import { objectIdZ } from '~types/util/objectId';
import { urlZ } from '~types/util/url';

const photoBase = z.object({
  caption: z.string().trim().optional(),
  location: z.string().trim().optional(),
  photoDate: z.date().nullable(),
});

// The photo as part of a create form - used for input and validation.
// _file is any for now (File type is not supported in Node.js, only in the browser).
const photoFormCreateZ = photoBase.extend({
  _file: z.any(),
  _dir: z.string(),
  _thumbnail: z.string(),
});

const photoFormCreateRequestZ = photoBase.extend({
  url: urlZ,
});

const photoWithIdZ = photoBase.extend({
  url: urlZ,
  _id: objectIdZ,
});

type photoFormCreateT = z.infer<typeof photoFormCreateZ>;
type photoFormCreateRequestT = z.infer<typeof photoFormCreateRequestZ>;
type photoWithIdT = z.infer<typeof photoWithIdZ>;

export type { photoFormCreateRequestT, photoFormCreateT, photoWithIdT };
export { photoFormCreateRequestZ, photoFormCreateZ, photoWithIdZ };
