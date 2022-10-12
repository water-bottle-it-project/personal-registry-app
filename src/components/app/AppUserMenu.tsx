import type { Sx } from '@mantine/core';
import { ActionIcon, Text, Title, Tooltip } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import { IconLogin, IconLogout } from '@tabler/icons';
import { useAuthUser } from 'next-firebase-auth';

import { withAuthComponent } from '~clientUtils/authHooks';
import { trpcClient } from '~clientUtils/trpcClient';

function AppUserMenuBase() {
  const { id, signOut } = useAuthUser();

  const trpcUtils = trpcClient.useContext();

  async function handleSignOut() {
    await signOut();
    await trpcUtils.queryClient.removeQueries();
    await trpcUtils.queryClient.getQueryCache().clear();
  }

  const openModal = () =>
    openConfirmModal({
      title: <Title order={3}>You're about to sign out</Title>,
      children: <Text size='sm'>Are you sure you want to sign out?</Text>,
      labels: { confirm: 'Sign out', cancel: 'Cancel' },
      confirmProps: { color: 'orange' },
      onConfirm: () => handleSignOut(),
      zIndex: '999',
    });

  return id ? (
    <Tooltip label='Sign out' withArrow>
      <ActionIcon color='orange' onClick={openModal} size='lg' sx={actionIconSx} variant='light'>
        <IconLogout size={19} />
      </ActionIcon>
    </Tooltip>
  ) : (
    <Tooltip label='Sign in' withArrow>
      <ActionIcon
        color='indigo'
        component={NextLink}
        href='/signin'
        size='lg'
        sx={actionIconSx}
        variant='light'
      >
        <IconLogin size={19} />
      </ActionIcon>
    </Tooltip>
  );
}

const actionIconSx: Sx = theme => ({
  boxShadow: theme.shadows.md,
  borderWidth: '1px',
  borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
});

const AppUserMenu = withAuthComponent(AppUserMenuBase);

export { AppUserMenu };
