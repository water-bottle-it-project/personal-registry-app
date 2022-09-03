import type { z } from 'zod';

import { collectionZ } from '~types/collection/collection';

type createCollectionT = z.infer<typeof createCollectionZ>;

const createCollectionZ = collectionZ.omit({ _id: true });

export type { createCollectionT };
export { createCollectionZ };
