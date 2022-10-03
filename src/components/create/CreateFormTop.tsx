import { Button, Group, Title } from '@mantine/core';
import { IconPlus, IconRotateClockwise2 } from '@tabler/icons';
import type { UseFormReturn } from 'react-hook-form';

import type { memoryCreateFormT } from '~types/memory/memoryForm';

export function CreateFormTop({
  reset,
  getValues,
  formState: { isSubmitting },
}: UseFormReturn<memoryCreateFormT>) {
  function resetWithCleanup() {
    const photos = getValues('photos');
    reset();
    photos.forEach(p => {
      URL.revokeObjectURL(p._thumbnail);
    });
  }

  return (
    <Group position='apart'>
      <Title>Create a memory</Title>
      <Group position='right'>
        <Button
          disabled={isSubmitting}
          onClick={resetWithCleanup}
          rightIcon={<IconRotateClockwise2 />}
          variant='default'
        >
          Reset
        </Button>
        <Button
          loaderPosition='right'
          loading={isSubmitting}
          rightIcon={<IconPlus />}
          type='submit'
        >
          Create
        </Button>
      </Group>
    </Group>
  );
}
