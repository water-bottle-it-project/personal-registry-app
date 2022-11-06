import { z } from 'zod';
export const objectIdZ = z.string().trim().min(1);
