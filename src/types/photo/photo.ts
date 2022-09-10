import { z } from 'zod';

// The photo in a database
const photoZ = z.object({
  _id: z.string().min(1),
  caption: z.string().trim().optional(),
  location: z.string().trim().optional(),
  url: z.string().url(),
  photoDate: z.date().nullable(),
  memoryId: z.string(),
  memoryDate: z.date(),
});

// The photo as part of a create form - used for input and validation.
// _file is any for now (File type is not supported in Node.js, only in the browser).
const photoFormCreateZ = photoZ
  .pick({
    caption: true,
    location: true,
    photoDate: true,
  })
  .extend({
    _file: z.any(),
    _dir: z.string(),
    _thumbnail: z.string(),
  });

const photoFormCreateRequestZ = photoZ.pick({
  caption: true,
  location: true,
  photoDate: true,
  url: true,
});

type photoT = z.infer<typeof photoZ>;
type photoFormCreateT = z.infer<typeof photoFormCreateZ>;
type photoFormCreateRequestT = z.infer<typeof photoFormCreateRequestZ>;

export type { photoFormCreateRequestT, photoFormCreateT, photoT };
export { photoFormCreateRequestZ, photoFormCreateZ, photoZ };
