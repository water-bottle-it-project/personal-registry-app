import { AuthAction, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

/**
 * For deeply-nested components which need to independently access auth state e.g. AppUserMenu
 */
const withAuthComponent = withAuthUser({
  whenUnauthedBeforeInit: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  whenAuthed: AuthAction.RENDER,
});

/**
 * For any page which needs to be authed
 */
const withAuthedPage = withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: `/signin/?unauthorized=${true}`,
});

/**
 * Returns a new function each time. For server-side rendered auth.
 */
const withAuthedPageSSR = () =>
  withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  })();

/**
 * For the login page
 */
const withLoginPage = withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  // whenUnauthedAfterInit: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
});

/**
 * Using SSR means server-side redirects, thus if a user is already logged in,
 * and they click 'Dashboard' (/login), they will not see the /login route in
 * their URL bar or in the page title ever.
 */
const withLoginPageSSR = () =>
  withAuthUserTokenSSR({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    // whenUnauthed: AuthAction.RENDER,
  })();

/**
 * For the Registration page
 */
const withRegisterPage = withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  // whenUnauthedAfterInit: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
});

export {
  withAuthComponent,
  withAuthedPage,
  withAuthedPageSSR,
  withLoginPage,
  withLoginPageSSR,
  withRegisterPage,
};
