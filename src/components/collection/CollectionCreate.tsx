import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Space, Stack, Textarea, TextInput } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconRotateClockwise2, IconX } from '@tabler/icons';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { ColorControl } from '~components/collection/ColorControl';
import type { collectionOmitIdT } from '~types/collectionT';
import { collectionOmitIdZ } from '~types/collectionT';

export function CollectionCreate() {
  useScrollLock(true);
  const router = useRouter();
  const trpcUtils = trpcClient.useContext();
  const creation = trpcClient.useMutation(['collection.CreateCollection']);

  function handleCollectionCreate({ title, color, description }: collectionOmitIdT) {
    console.log('submitted');
    creation.mutate(
      {
        title: title,
        color: color,
        description: description,
      },
      {
        onSuccess: async () => {
          // Auto-refresh without reload
          await trpcUtils.invalidateQueries(['collection.GetCollections']);
          await router.push('/collections', undefined, { shallow: true });
          showNotification({
            icon: <IconCheck />,
            title: 'Success!',
            message: `${title} successfully created.`,
          });
        },
        onError: async error => {
          showNotification({
            icon: <IconX />,
            color: 'red',
            title: 'Failed to create collection.',
            message: error.message,
          });
        },
      },
    );
  }

  return (
    <>
      <CollectionCreateForm handleCollectionCreate={handleCollectionCreate} />
    </>
  );
}

interface CollectionCreateFormProps {
  handleCollectionCreate: ({ title, color, description }: collectionOmitIdT) => void;
}

/**
 * @param handleCollectionCreate
 * @constructor
 */
function CollectionCreateForm({ handleCollectionCreate }: CollectionCreateFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<collectionOmitIdT>({
    resolver: zodResolver(collectionOmitIdZ),
    defaultValues: { color: 'indigo', description: '', title: '' },
  });

  return (
    <form noValidate onSubmit={handleSubmit(handleCollectionCreate)}>
      <Stack spacing='sm'>
        <TextInput
          description='Displayed front and centre.'
          error={errors?.title?.message}
          label='Title'
          placeholder='Add a title.'
          required
          {...register('title')}
        />
        <Textarea
          autosize
          description='Add some more detail.'
          label='Description'
          maxRows={12}
          placeholder='Describe your collection.'
          {...register('description')}
        />
        <Controller
          control={control}
          name='color'
          render={({ field: { value, onChange, ref, ...field } }) => (
            <ColorControl
              inputRef={ref}
              label='Colour'
              onChange={onChange}
              value={value}
              {...field}
            />
          )}
        />
        <Space h='xl' />
        <Group position='apart'>
          <Button leftIcon={<IconDeviceFloppy />} type='submit'>
            Save
          </Button>
          <Button
            leftIcon={<IconRotateClockwise2 />}
            onClick={() => {
              reset();
            }}
            variant='default'
          >
            Reset
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
