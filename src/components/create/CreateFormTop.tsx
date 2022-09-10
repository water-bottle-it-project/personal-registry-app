import { Button, Group, Title } from '@mantine/core';
import { IconPlus, IconRotateClockwise2 } from '@tabler/icons';
import type { UseFormReturn } from 'react-hook-form';

import type { memoryCreateFormT } from '~types/memory/memoryForm';

export function CreateFormTop({ reset, getValues }: UseFormReturn<memoryCreateFormT>) {
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
        <Button onClick={resetWithCleanup} rightIcon={<IconRotateClockwise2 />} variant='default'>
          Reset
        </Button>
        <Button rightIcon={<IconPlus />} type='submit'>
          Create
        </Button>
      </Group>
    </Group>
  );
}
