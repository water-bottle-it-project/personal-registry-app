import { Button, Group, Title } from '@mantine/core';
import { IconPlus, IconRotateClockwise2 } from '@tabler/icons';

export function CreateFormTop() {
  return (
    <Group position='apart'>
      <Title>Create a memory</Title>
      <Group position='right'>
        <Button rightIcon={<IconRotateClockwise2 />} variant='default'>
          Reset
        </Button>
        <Button rightIcon={<IconPlus />} type='submit'>
          Create
        </Button>
      </Group>
    </Group>
  );
}
