import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import { getUserFromCookies } from 'next-firebase-auth';

async function createContext({ req }: trpcNext.CreateNextContextOptions) {
  let userId: string | null = null;

  try {
    const user = await getUserFromCookies({ req });
    userId = user.id;
  } catch {
    // Just in case
    userId = null;
  }

  return { userId };
}

type Context = inferAsyncReturnType<typeof createContext>;

export type { Context };
export { createContext };
