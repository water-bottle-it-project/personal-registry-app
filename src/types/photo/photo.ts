import { z } from 'zod';

const photoZ = z.object({
  _id: z.string().min(1),
  caption: z.string().optional(),
  location: z.string().optional(),
  url: z.string().url(),
  photoDate: z.date().optional(),
  memoryId: z.string(),
  memoryDate: z.date(),
});

const photoFormCreateZ = photoZ.omit({ _id: true, memoryId: true });

type photoT = z.infer<typeof photoZ>;
type photoFormCreateT = z.infer<typeof photoFormCreateZ>;

export type { photoFormCreateT, photoT };
export { photoFormCreateZ, photoZ };
