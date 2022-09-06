import { createUnauthedDbRouter } from '~server/createUnauthedDbRouter';
import { User } from '~server/models/user';

/**
 * Router for profile management operations
 */
const profileRouter = createUnauthedDbRouter().query('listUsers', {
  async resolve() {
    const user = await User.find();
    return {
      user,
    };
  },
});

export { profileRouter };
