import { z } from 'zod';

export type { objectIdT };

type objectIdT = z.infer<typeof objectIdZ>;

export const objectIdZ = z.string().trim().min(1);
