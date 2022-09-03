import { createProtectedDbRouter } from '~server/createProtectedDbRouter';

const debugAuthedRouter = createProtectedDbRouter().query('getAuthedDebug', {
  resolve({ ctx }) {
    return {
      result: 12345,
    };
  },
});

export { debugAuthedRouter };
