import type { MiddlewareFunction } from '@trpc/server/src/internals/middlewares';

import type { Context } from '~server/context';
import { dbConnect } from '~server/db/dbConnect';

/**
 * Middleware for connecting to database.
 * @param next
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dbReqHandler: MiddlewareFunction<Context, Context, any> = async ({ next }) => {
  await dbConnect();
  return next();
};
