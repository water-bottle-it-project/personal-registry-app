import { createReactQueryHooks } from '@trpc/react';

import type { AppRouter } from '~pages/api/trpc/[trpc]';

/**
 * Create client-side TRPC React component hooks
 */
const trpcClient = createReactQueryHooks<AppRouter>();

export { trpcClient };
