import { z } from 'zod';

import { emailZ } from '~types/util/emailT';

const signinZ = z
  .object({
    email: emailZ,
    password: z.string().min(1),
  })
  .required();

type SigninT = z.infer<typeof signinZ>;

export type { SigninT };
export { signinZ };
