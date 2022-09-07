import { Button } from '@mantine/core';
import { useAuthUser } from 'next-firebase-auth';

import { withAuthComponent } from '~clientUtils/authHooks';
import { trpcClient } from '~clientUtils/trpcClient';
import { LinkButton } from '~components/util/LinkButton';

function AppUserMenuBase() {
  const { id, signOut } = useAuthUser();

  const trpcUtils = trpcClient.useContext();

  async function handleSignOut() {
    await signOut();
    await trpcUtils.queryClient.getQueryCache().clear();
  }

  return id ? (
    <Button color='orange' onClick={handleSignOut} variant='light'>
      Sign out
    </Button>
  ) : (
    <LinkButton href='/signin' variant='default'>
      Sign in
    </LinkButton>
  );
}

const AppUserMenu = withAuthComponent(AppUserMenuBase);

export { AppUserMenu };
