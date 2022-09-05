import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Space, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { closeAllModals, openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconRotateClockwise2, IconTrash, IconX } from '@tabler/icons';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { ColorControl } from '~components/collection/ColorControl';
import type { collectionT } from '~types/collection/collection';
import type { collectionIdOnlyT } from '~types/collection/collectionIdOnly';
import type { collectionOmitIdT } from '~types/collection/collectionOmitId';
import { collectionOmitIdZ } from '~types/collection/collectionOmitId';

export function CollectionEdit(props: collectionIdOnlyT) {
  useScrollLock(true);
  const router = useRouter();
  const mutation = trpcClient.useMutation(['collection.UpdateCollection']);
  const deletion = trpcClient.useMutation(['collection.DeleteCollection']);
  const trpcUtils = trpcClient.useContext();
  const { data, isLoading, isError, error } = trpcClient.useQuery([
    'collection.GetCollection',
    { _id: props._id },
  ]);

  function handleCollectionEdit({ title, color, description }: collectionOmitIdT) {
    console.log('submitted');
    mutation.mutate(
      {
        _id: props._id,
        title: title,
        color: color,
        description: description,
      },
      {
        onSuccess: async () => {
          // Auto-refresh without reload
          await trpcUtils.invalidateQueries(['collection.GetCollections']);
          await trpcUtils.invalidateQueries(['collection.GetCollection', { _id: props._id }]);
          await router.push('/collections', undefined, { shallow: true });
          showNotification({
            icon: <IconCheck />,
            title: 'Success!',
            message: 'Collection successfully saved.',
          });
        },
      },
    );
  }

  function handleCollectionDelete() {
    console.log('deletion attempted');
    deletion.mutate(
      { _id: props._id },
      {
        onSuccess: async () => {
          // Auto-refresh without reload
          await trpcUtils.invalidateQueries(['collection.GetCollections']);
          // await trpcUtils.invalidateQueries(['collection.GetCollection', { _id: props._id }]);
          await router.push('/collections', undefined, { shallow: true });
          showNotification({
            icon: <IconCheck />,
            title: 'Success!',
            message: 'Collection successfully deleted.',
          });
        },
      },
    );
  }

  if (isError) {
    showNotification({
      icon: <IconX />,
      color: 'red',
      title: 'Error!',
      message: 'Error loading collection details.',
    });
    return <Text>Error loading collection details: {error?.message}</Text>;
  }

  if (isLoading || !data?.collection) {
    return <Text>Loading collection details...</Text>;
  }

  return (
    <>
      <Text color='dimmed' size='xs'>
        Collection id: {props._id}
      </Text>
      <Space h='sm' />
      <CollectionEditForm
        collection={data.collection}
        handleCollectionDelete={handleCollectionDelete}
        handleCollectionEdit={handleCollectionEdit}
      />
    </>
  );
}

interface CollectionEditFormProps {
  collection: collectionT;
  handleCollectionEdit: ({ title, color, description }: collectionOmitIdT) => void;
  handleCollectionDelete: () => void;
}

/**
 * Only render form if collection is known to exist
 * Note this takes a copy of the data (does not reflect background changes)
 * https://tkdodo.eu/blog/react-query-and-forms
 * (I couldn't get the background controlled form to work properly yet with the TextInput and
 * TextArea).
 * @param collection
 * @param handleCollectionEdit
 * @constructor
 */
function CollectionEditForm({
  collection,
  handleCollectionEdit,
  handleCollectionDelete,
}: CollectionEditFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<collectionOmitIdT>({
    resolver: zodResolver(collectionOmitIdZ),
    defaultValues: collection,
  });

  const openModal = () =>
    openConfirmModal({
      title: 'Warning',
      children: (
        <Text size='sm'>Are you sure you want to delete the collection {collection.title}?</Text>
      ),
      labels: { confirm: 'Delete Collection', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => handleCollectionDelete(),
      zIndex: '999',
    });

  return (
    <form noValidate onSubmit={handleSubmit(handleCollectionEdit)}>
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
          render={({ field: { value, onChange, ...field } }) => (
            <ColorControl {...field} label='Colour' onChange={onChange} value={value} />
          )}
        />
        <Group position='apart'>
          <Button leftIcon={<IconDeviceFloppy />} type='submit'>
            Save
          </Button>
          <Group>
            <Button color='red' leftIcon={<IconTrash />} onClick={openModal}>
              Delete
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
        </Group>
      </Stack>
    </form>
  );
}
