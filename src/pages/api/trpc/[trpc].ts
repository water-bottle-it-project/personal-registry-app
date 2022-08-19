import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import { debugRouter } from '~server/routers/debug';

/**
 * Merge individual routers together to form the TRPC API router.
 */
const appRouter = trpc.router().merge('debug.', debugRouter);

/**
 * Export type-safe route paths, inputs, and outputs
 */
export type AppRouter = typeof appRouter;

/**
 * Add Next.js API route integration
 */
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
