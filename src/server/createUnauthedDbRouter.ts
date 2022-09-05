import { createRouter } from '~server/createRouter';
import { dbConnect } from '~server/db/dbConnect';

/**
 * Temporary stopgap for building authed-only pages without auth.
 */
export function createUnauthedDbRouter() {
  return createRouter().middleware(async ({ next }) => {
    await dbConnect();
    return next();
  });
}
