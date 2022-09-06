import type { z } from 'zod';

import { collectionZ } from '~types/collection/collection';

type collectionOmitIdT = z.infer<typeof collectionOmitIdZ>;

const collectionOmitIdZ = collectionZ.omit({ _id: true });

export type { collectionOmitIdT };
export { collectionOmitIdZ };
