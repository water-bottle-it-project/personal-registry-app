import { zodResolver } from '@hookform/resolvers/zod';
import { ActionIcon, Stack, TextInput, Title } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons';
import { useForm } from 'react-hook-form';

import type { photoSearchT } from '~types/photo/photo';
import { photoSearchZ } from '~types/photo/photo';

export function PhotoSearch() {
  const { register, handleSubmit } = useForm<photoSearchT>({
    resolver: zodResolver(photoSearchZ),
  });

  const onSubmit = async ({ text }) => {
    // setSearchState(text);
    console.log(text);
  };

  return (
    <>
      <Stack spacing='sm'>
        <Title>Your photos</Title>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            placeholder='Search your photos by caption'
            rightSection={
              <ActionIcon color='indigo' size={32} type='submit' variant='filled'>
                <IconArrowRight size={18} stroke={1.5} />
              </ActionIcon>
            }
            rightSectionWidth={42}
            size='md'
            {...register('text')}
          />
        </form>
      </Stack>
    </>
  );
}
