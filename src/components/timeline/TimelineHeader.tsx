import { ActionIcon, Stack, TextInput, Title } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons';

export function TimelineHeader() {
  return (
    <Stack spacing='sm'>
      <Title>Your memories</Title>
      <TextInput
        icon={<IconSearch size={18} stroke={1.5} />}
        placeholder='Search your memories by title and description'
        rightSection={
          <ActionIcon color='indigo' size={32} variant='filled'>
            <IconArrowRight size={18} stroke={1.5} />
          </ActionIcon>
        }
        rightSectionWidth={42}
        size='md'
      />
    </Stack>
  );
}
