import { Button } from '@mantine/core';
import { useAuthUser } from 'next-firebase-auth';

import { withAuthComponent } from '~clientUtils/authHooks';
import { LinkButton } from '~components/util/LinkButton';

function AppUserMenuBase() {
  const { id, signOut } = useAuthUser();

  return id ? (
    <Button color='orange' onClick={signOut} variant='light'>
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
