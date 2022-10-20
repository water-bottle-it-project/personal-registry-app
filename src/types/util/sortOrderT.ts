import { z } from 'zod';

const sortOrderZ = z.enum(['ascending', 'descending']).default('descending');

type sortOrderT = z.infer<typeof sortOrderZ>;

export type { sortOrderT };
export { sortOrderZ };
