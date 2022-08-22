import { AuthAction, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

/**
 * For any page which needs to be authed
 */
export const withAuthedPage = withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
});

/**
 * Returns a new function each time. For server-side rendered auth.
 */
export const withAuthedPageSSR = () =>
  withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  })();

/**
 * For the login page
 */
export const withLoginPage = withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  // whenUnauthedAfterInit: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
});

/**
 * Using SSR means server-side redirects, thus if a user is already logged in,
 * and they click 'Dashboard' (/login), they will not see the /login route in
 * their URL bar or in the page title ever.
 */
export const withLoginPageSSR = () =>
  withAuthUserTokenSSR({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    // whenUnauthed: AuthAction.RENDER,
  })();
