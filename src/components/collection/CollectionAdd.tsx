import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Space, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconRotateClockwise2 } from '@tabler/icons';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { ColorControl } from '~components/collection/ColorControl';
import type { collectionT } from '~types/collection/collection';
import type { collectionOmitIdT } from '~types/collection/collectionOmitId';
import { collectionOmitIdZ } from '~types/collection/collectionOmitId';

export function CollectionAdd() {
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
            message: `Collection ${title} successfully created.`,
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
          required
          {...register('title')}
        />
        <Textarea
          autosize
          description='Add some more detail.'
          label='Description'
          maxRows={12}
          placeholder={`There's still space to add a description!`}
          {...register('description')}
        />
        <Controller
          control={control}
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
