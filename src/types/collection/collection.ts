import { z } from 'zod';

import { colorZ } from '~types/util/color';

// For getting and updating collections.
const collectionZ = z
  .object({
    _id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    color: colorZ.optional(),
  })
  .required();

type collectionT = z.infer<typeof collectionZ>;

export type { collectionT };
export { collectionZ };
