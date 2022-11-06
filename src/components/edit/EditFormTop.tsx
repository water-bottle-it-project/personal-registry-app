import { deleteObject, getStorage, ref as storageRef } from '@firebase/storage';
import { Button, Group, Text, Title } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconRotateClockwise2, IconTrash, IconX } from '@tabler/icons';
import { useRouter } from 'next/router';
import type { UseFormReturn } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import type { memoryEditFormT } from '~types/memoryT';

export function EditFormTop({
  reset,
  getValues,
  formState: { isSubmitting },
}: UseFormReturn<memoryEditFormT>) {
  function resetWithCleanup() {
    const photos = getValues('photos');
    // console.warn('RESETTING');
    reset();
    photos.forEach(p => {
      if (p._thumbnail) {
        URL.revokeObjectURL(p._thumbnail);
      }
    });
  }

  const router = useRouter();
  const trpcUtils = trpcClient.useContext();
  const deleteMutation = trpcClient.useMutation(['memory.DeleteMemory']);

  async function handleDelete() {
    const _id = getValues('_id');
    await deleteMutation.mutate(
      { _id },
      {
        onSuccess: async data => {
          // Delete files from Firebase Storage.
          const fileDeleteRequests = data.map(async del => {
            const fileRef = storageRef(getStorage(), del);
            return deleteObject(fileRef);
          });
          await Promise.all(fileDeleteRequests);

          // Redirect
          await trpcUtils.invalidateQueries(['memory.GetMemories']);
          await router.push('/memories');
          showNotification({
            icon: <IconCheck />,
            title: 'Success!',
            message: 'Memory successfully deleted.',
          });
        },

        onError: async error => {
          showNotification({
            icon: <IconX />,
            color: 'red',
            title: 'Error deleting memory!',
            message: error.message,
          });
        },
      },
    );
  }

  const openDeleteModal = () =>
    openConfirmModal({
      title: <Title order={3}>Delete this memory</Title>,
      centered: true,
      children: <Text size='sm'>Are you sure you want to delete this memory?</Text>,
      labels: { confirm: `Yes, I'm sure`, cancel: 'No' },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    });

  return (
    <Group position='apart'>
      <Title>Edit this memory</Title>
      <Group position='right'>
        <Button
          color='red'
          disabled={isSubmitting}
          leftIcon={<IconTrash />}
          onClick={openDeleteModal}
        >
          Delete
        </Button>
        <Button
          disabled={isSubmitting}
          leftIcon={<IconRotateClockwise2 />}
          onClick={resetWithCleanup}
          variant='default'
        >
          Reset
        </Button>
        <Button
          disabled={isSubmitting}
          leftIcon={<IconDeviceFloppy />}
          loaderPosition='right'
          loading={isSubmitting}
          type='submit'
        >
          Save edits
        </Button>
      </Group>
    </Group>
  );
}
