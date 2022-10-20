import { z } from 'zod';

import { colorZ } from '~types/util/color';

// For getting and updating collections.
const collectionZ = z
  .object({
    _id: z.string().min(1),
    title: z.string().trim().min(1),
    description: z.string().trim().optional(),
    color: colorZ.optional(),
  })
  .required();

const collectionMemory2Z = collectionZ.omit({ description: true });

const collectionSearchZ = z
  .object({
    text: z.string().trim().nullish().default(''),
  })
  .nullish();

const collectionSelectItemZ = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

type collectionT = z.infer<typeof collectionZ>;
type collectionMemory2T = z.infer<typeof collectionMemory2Z>;
type collectionSelectItemT = z.infer<typeof collectionSelectItemZ>;

export type { collectionMemory2T, collectionSelectItemT, collectionT };
export { collectionMemory2Z, collectionSearchZ, collectionSelectItemZ, collectionZ };
