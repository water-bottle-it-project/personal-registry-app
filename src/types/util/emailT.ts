import { z } from 'zod';

const emailZ = z.string().email().trim().min(1);

export { emailZ };
