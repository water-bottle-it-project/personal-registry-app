import { z } from 'zod';

import { colorZ } from '~types/util';

const editCollectionZ = z
  .object({
    oldTitle: z.string(),
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    color: colorZ,
  })
  .required();

type EditCollectionT = z.infer<typeof editCollectionZ>;

export type { EditCollectionT };
export { editCollectionZ };
