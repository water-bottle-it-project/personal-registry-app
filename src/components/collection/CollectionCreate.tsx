import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Space, Stack, Textarea, TextInput } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconRotateClockwise2 } from '@tabler/icons';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { ColorControl } from '~components/collection/ColorControl';
import type { collectionOmitIdT } from '~types/collection/collectionOmitId';
import { collectionOmitIdZ } from '~types/collection/collectionOmitId';

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
          await router.push('/collections');
          showNotification({
            icon: <IconCheck />,
            title: 'Success!',
            message: `${title} successfully created.`,
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
          defaultValue='dark'
          name='color'
          render={({ field: { value, onChange, ref, ...field } }) => (
            <ColorControl
              {...field}
              inputRef={ref}
              label='Colour'
              onChange={onChange}
              value={value}
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
