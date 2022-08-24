import * as trpc from '@trpc/server';

import type { Context } from '~server/context';

/**
 * createRouter is a function which creates a new router object when createRouter() is called.
 */
const createRouter = trpc.router<Context>;

export { createRouter };
