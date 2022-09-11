import { z } from 'zod';

import { colorZ } from '~types/util/color';

// For displaying collections for a single memory
const collectionMemoryZ = z
  .object({
    collectionId: z.string().min(1),
    collectionTitle: z.string().trim().min(1),
    collectionColor: colorZ.optional(),
  })
  .required();

type collectionMemoryT = z.infer<typeof collectionMemoryZ>;

export type { collectionMemoryT };
export { collectionMemoryZ };
