import { ActionIcon, Radio, Stack, TextInput, useMantineTheme } from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface CollectionSearchFormProps {
  setIsSearching: any;
  setSearchQuery: any;
}

const collectionSearchZ = z
  .object({
    text: z.string().trim().min(1).max(100),
  })
  .required();

type CollectionSearchT = z.infer<typeof collectionSearchZ>;

export function CollectionSearchForm(props: CollectionSearchFormProps) {
  const {
    register,
    handleSubmit,
    // setError,
    // formState: { errors, isValidating, isSubmitting, isSubmitSuccessful },
  } = useForm<CollectionSearchT>({
    resolver: zodResolver(collectionSearchZ),
  });

  function handleCollectionSearch({ text }: { text: string }) {
    props.setSearchQuery({ text: text, searchType: value });
    props.setIsSearching(true);
  }

  const theme = useMantineTheme();
  const [value, setValue] = useState('title');
  return (
    <form noValidate onSubmit={handleSubmit(handleCollectionSearch)}>
      <Stack spacing='xs'>
        <TextInput
          icon={<IconSearch size={18} stroke={1.5} />}
          placeholder='Enter a collection name.'
          radius='lg'
          rightSection={
            <ActionIcon
              color={theme.primaryColor}
              radius='lg'
              size={32}
              variant='filled'
              type='submit'
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
          {...register('text')}
        />
        <Radio.Group label='Search by' onChange={setValue} value={value}>
          <Radio label='Title' value='title' />
          <Radio label='Description' value='description' />
        </Radio.Group>
      </Stack>
    </form>
  );
}
