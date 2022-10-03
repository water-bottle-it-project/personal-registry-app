import { Button, Group, Title } from '@mantine/core';
import { IconDeviceFloppy, IconRotateClockwise2 } from '@tabler/icons';
import type { UseFormReturn } from 'react-hook-form';

import type { memoryEditFormT } from '~types/memory/memoryForm';

export function EditFormTop({
  reset,
  getValues,
  formState: { isSubmitting },
}: UseFormReturn<memoryEditFormT>) {
  function resetWithCleanup() {
    const photos = getValues('photos');
    console.warn('RESETTING');
    reset();
    photos.forEach(p => {
      if (p._thumbnail) {
        URL.revokeObjectURL(p._thumbnail);
      }
    });
  }

  return (
    <Group position='apart'>
      <Title>Edit this memory</Title>
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
          rightIcon={<IconDeviceFloppy />}
          type='submit'
        >
          Save edits
        </Button>
      </Group>
    </Group>
  );
}
