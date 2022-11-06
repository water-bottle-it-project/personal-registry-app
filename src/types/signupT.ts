import { z } from 'zod';

import { emailZ } from '~types/util/emailT';

const signupZ = z
  .object({
    email: emailZ,
    password: z.string().min(6),
    repeatPassword: z.string().min(6),
  })
  .required();

type SignupT = z.infer<typeof signupZ>;

export type { SignupT };
export { signupZ };
