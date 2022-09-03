import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import type { AuthUser } from 'next-firebase-auth';
import { getUserFromCookies } from 'next-firebase-auth';

async function createContext({ req }: trpcNext.CreateNextContextOptions) {
  let user: AuthUser | null = null;

  try {
    user = await getUserFromCookies({ req });
  } catch {
    // Just in case
    user = null;
  }

  return { user };
}

type Context = inferAsyncReturnType<typeof createContext>;

export type { Context };
export { createContext };
