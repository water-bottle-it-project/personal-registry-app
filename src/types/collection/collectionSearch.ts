import { z } from 'zod';

const collectionSearchZ = z
  .object({
    text: z.string().trim().min(1).max(100),
    searchType: z.string().trim().min(1).max(100),
  })
  .required();

type collectionSearchT = z.infer<typeof collectionSearchZ>;

export type { collectionSearchT };
export { collectionSearchZ };
