import type { MiddlewareFunction } from '@trpc/server/src/internals/middlewares';

import { dbConnect } from '~server/db/dbConnect';

/**
 * Middleware for connecting to database.
 * @param next
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dbReqHandler: MiddlewareFunction<any, any, any> = async ({ next }) => {
  await dbConnect();
  return next();
};
