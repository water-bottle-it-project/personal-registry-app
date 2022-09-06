import type { z } from 'zod';

import { collectionZ } from '~types/collection/collection';

const collectionIdOnlyZ = collectionZ.pick({ _id: true });

type collectionIdOnlyT = z.infer<typeof collectionIdOnlyZ>;

export type { collectionIdOnlyT };
export { collectionIdOnlyZ };
