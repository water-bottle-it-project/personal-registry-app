import { ActionIcon, Radio, Stack, TextInput, useMantineTheme } from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons';
import { useState } from 'react';

interface CollectionSearchFormProps {
  setIsSearching: (event: React.MouseEvent<HTMLElement>) => void;
  setSearchText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
}

export function CollectionSearchForm(props: CollectionSearchFormProps) {
  const theme = useMantineTheme();
  const [value, setValue] = useState('title');
  return (
    <>
      <Stack spacing='xs'>
        <TextInput
          icon={<IconSearch size={18} stroke={1.5} />}
          onChange={event => props.setSearchText(event.currentTarget.value)}
          placeholder='Enter a collection name.'
          radius='lg'
          rightSection={
            <ActionIcon
              color={theme.primaryColor}
              onClick={props.setIsSearching}
              radius='lg'
              size={32}
              variant='filled'
            >
              {theme.dir === 'ltr' ? (
                <IconArrowRight size={18} stroke={1.5} />
              ) : (
                <IconArrowLeft size={18} stroke={1.5} />
              )}
            </ActionIcon>
          }
          rightSectionWidth={42}
          size='md'
          value={props.searchText}
        />
        <Radio.Group label='Search by' onChange={setValue} value={value}>
          <Radio label='Title' value='title' />
          <Radio label='Description' value='description' />
        </Radio.Group>
      </Stack>
    </>
  );
}
