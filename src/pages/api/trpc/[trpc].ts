import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';

import type { Context } from '~server/context';
import { createContext } from '~server/context';
import { collectionRouter } from '~server/routers/collection';
import { debugAuthedRouter } from '~server/routers/debugAuthed';
import { memoryRouter } from '~server/routers/memory';
import { photosRouter } from '~server/routers/photo';
import { profileRouter } from '~server/routers/profile';

/**
 * Merge individual routers together to form the TRPC API router.
 */
const appRouter = trpc
  .router<Context>()
  .transformer(superjson)
  .merge('collection.', collectionRouter)
  .merge('debugAuthed.', debugAuthedRouter)
  .merge('photos.', photosRouter)
  .merge('profile.', profileRouter)
  .merge('memory.', memoryRouter);

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
