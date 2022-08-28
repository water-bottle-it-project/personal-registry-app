import { z } from 'zod';

import { emailZ } from '~types/util';

const signupZ = z
  .object({
    email: emailZ,
    password: z.string().min(1),
    repeatPassword: z.string().min(1),
  })
  .required();

type SignupT = z.infer<typeof signupZ>;

export type { SignupT };
export { signupZ };
