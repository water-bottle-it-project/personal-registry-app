import { z } from 'zod';

const imageZ = z
  .object({
    _id: z.string().min(1),
    url: z.string().min(1),
    userId: z.string().min(1),
    memoryId: z.string().min(1),
    memoryDate: z.string().min(1),
    photoDate: z.string().optional(),
    caption: z.string().trim().optional(),
    location: z.string().trim().optional(),
  })
  .required();

const imageIdOnlyZ = imageZ.pick({ _id: true });

type imageT = z.infer<typeof imageZ>;
type imageIdOnlyT = z.infer<typeof imageIdOnlyZ>;

export type { imageIdOnlyT, imageT };
export { imageIdOnlyZ, imageZ };
