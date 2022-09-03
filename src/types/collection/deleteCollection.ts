import type { z } from 'zod';

import { collectionZ } from '~types/collection/collection';
const deleteCollectionZ = collectionZ.pick({ _id: true });

type deleteCollectionT = z.infer<typeof deleteCollectionZ>;

export type { deleteCollectionT };
export { deleteCollectionZ };
