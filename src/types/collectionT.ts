import { z } from 'zod';

import { colorZ } from '~types/util/colorT';

// For getting and updating collections.
const collectionZ = z
  .object({
    _id: z.string().min(1),
    title: z.string().trim().min(1),
    description: z.string().trim().optional(),
    color: colorZ.optional(),
  })
  .required();

const collectionMemoryZ = collectionZ.omit({ description: true });

const collectionSearchZ = z
  .object({
    text: z.string().trim().nullish().default(''),
  })
  .nullish();

const collectionSelectItemZ = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

const collectionIdOnlyZ = collectionZ.pick({ _id: true });

const collectionOmitIdZ = collectionZ.omit({ _id: true });

type collectionT = z.infer<typeof collectionZ>;
type collectionSelectItemT = z.infer<typeof collectionSelectItemZ>;
type collectionIdOnlyT = z.infer<typeof collectionIdOnlyZ>;
type collectionOmitIdT = z.infer<typeof collectionOmitIdZ>;

export type { collectionIdOnlyT, collectionOmitIdT, collectionSelectItemT, collectionT };

export {
  collectionIdOnlyZ,
  collectionMemoryZ,
  collectionOmitIdZ,
  collectionSearchZ,
  collectionSelectItemZ,
  collectionZ,
};
