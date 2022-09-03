import { createProtectedDbRouter } from '~server/createProtectedDbRouter';

const debugAuthedRouter = createProtectedDbRouter().query('getAuthedDebug', {
  resolve({ ctx }) {
    // console.log(`ctx.userId: ${ctx.userId}`);
    return {
      result: 12345,
    };
  },
});

export { debugAuthedRouter };
