import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import type { AuthUser } from 'next-firebase-auth';
import { verifyIdToken } from 'next-firebase-auth';

async function createContext({ req }: trpcNext.CreateNextContextOptions) {
  async function getUserFromHeader(): Promise<AuthUser | null> {
    if (req.headers?.authorization) {
      let user;
      try {
        user = await verifyIdToken(req.headers.authorization);
        return user;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  const user = getUserFromHeader();

  return { user };
}

type Context = inferAsyncReturnType<typeof createContext>;

export type { Context };
export { createContext };
