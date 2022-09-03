import { z } from 'zod';

const editCollectionZ = z
  .object({
    oldTitle: z.string(),
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    color: z.string(),
  })
  .required();

type EditCollectionT = z.infer<typeof editCollectionZ>;

export type { EditCollectionT };
export { editCollectionZ };
