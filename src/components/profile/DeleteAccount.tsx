import { deleteUser } from '@firebase/auth';
import { Button, Text, Title } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useAuthUser } from 'next-firebase-auth';

import { trpcClient } from '~clientUtils/trpcClient';
import {
  showFailureNotification,
  showSuccessNotification,
} from '~components/util/notificationHelpers';

export function DeleteAccount() {
  const allMutation = trpcClient.useMutation(['profile.DeleteUser']);
  const user = useAuthUser();
  const trpcUtils = trpcClient.useContext();

  async function handleDeleteAccount() {
    if (!user.id || !user.firebaseUser) {
      showFailureNotification('Not authed.');
      return;
    }

    await allMutation.mutate();
    await deleteUser(user.firebaseUser);
    await trpcUtils.queryClient.removeQueries();
    await trpcUtils.queryClient.getQueryCache().clear();
    showSuccessNotification('Deleted your profile.');
  }

  const openDeleteModal = () =>
    openConfirmModal({
      title: <Title order={3}>Delete your profile</Title>,
      centered: true,
      children: <Text size='sm'>Are you sure you want to delete everything?</Text>,
      labels: { confirm: `Yes, I'm sure`, cancel: 'No' },
      confirmProps: { color: 'red' },
      onConfirm: handleDeleteAccount,
    });

  return (
    <>
      <Button ml={10} onClick={openDeleteModal}>
        Delete Account
      </Button>
    </>
  );
}
