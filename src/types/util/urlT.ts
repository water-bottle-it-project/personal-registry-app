import { z } from 'zod';

export const urlZ = z.string().url();
