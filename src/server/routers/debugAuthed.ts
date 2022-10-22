import { createProtectedDbRouter } from '~server/createProtectedDbRouter';

const debugAuthedRouter = createProtectedDbRouter().query('getAuthedDebug', {
  resolve() {
    // console.log(`ctx.userId: ${ctx.userId}`);
    return {
      result: 12345,
    };
  },
});

export { debugAuthedRouter };
