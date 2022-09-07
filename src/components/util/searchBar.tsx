import { ActionIcon, Radio, Space, Stack, TextInput, Title } from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons';
interface searchBarProps {
  searchTitle: string;
  searchPlaceHolder: string;
  searchFilters: string[];
}

export function SearchBar(props: searchBarProps) {
  props.searchFilters.map(filter => console.log(filter));

  const filters = props.searchFilters && (
    <Radio.Group label='Search by'>
      {props.searchFilters.map((filter: string) => (
        <Radio key={filter} label={filter} value={filter} />
      ))}
    </Radio.Group>
  );

  return (
    <>
      <Title order={1}>{props.searchTitle}</Title>
      <Space h='md' />
      <Stack spacing='sm'>
        <TextInput
          icon={<IconSearch size={18} stroke={1.5} />}
          placeholder={props.searchPlaceHolder}
          radius='lg'
          rightSection={
            <ActionIcon color='indigo' radius='lg' size={32} variant='filled'>
              <IconArrowRight size={18} stroke={1.5} />
            </ActionIcon>
          }
          rightSectionWidth={42}
          size='md'
        />
      </Stack>
      <Space h='md' />
      {filters}
    </>
  );
}
