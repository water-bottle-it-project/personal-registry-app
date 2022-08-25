import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import type { Context } from '~server/context';
import { createContext } from '~server/context';
import { debugRouter } from '~server/routers/debug';
import { debugAuthedRouter } from '~server/routers/debugAuthed';
import { imagesRouter } from '~server/routers/image';

/**
 * Merge individual routers together to form the TRPC API router.
 */
const appRouter = trpc
  .router<Context>()
  .merge('debug.', debugRouter)
  .merge('debugAuthed.', debugAuthedRouter)
  .merge('images.', imagesRouter);

/**
 * Export type-safe route paths, inputs, and outputs
 */
export type AppRouter = typeof appRouter;

/**
 * Add Next.js API route integration
 */
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
