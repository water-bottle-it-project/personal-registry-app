import { ActionIcon, Radio, Stack, TextInput, useMantineTheme } from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons';

export function CollectionSearchForm() {
  const theme = useMantineTheme();
  return (
    <>
      <Stack spacing='xs'>
        <TextInput
          icon={<IconSearch size={18} stroke={1.5} />}
          placeholder='Enter a collection name.'
          radius='lg'
          rightSection={
            <ActionIcon color={theme.primaryColor} radius='lg' size={32} variant='filled'>
              {theme.dir === 'ltr' ? (
                <IconArrowRight size={18} stroke={1.5} />
              ) : (
                <IconArrowLeft size={18} stroke={1.5} />
              )}
            </ActionIcon>
          }
          rightSectionWidth={42}
          size='md'
        />
        <Radio.Group label='Search by'>
          <Radio checked label='Title' value='title' />
          <Radio label='Description' value='description' />
        </Radio.Group>
      </Stack>
    </>
  );
}
