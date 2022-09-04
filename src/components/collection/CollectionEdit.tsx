import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { ColorControl } from '~components/collection/ColorControl';
import type { collectionT } from '~types/collection/collection';
import type { collectionIdOnlyT } from '~types/collection/collectionIdOnly';
import type { collectionOmitIdT } from '~types/collection/collectionOmitId';
import { collectionOmitIdZ } from '~types/collection/collectionOmitId';

export function CollectionEdit(props: collectionIdOnlyT) {
  const mutation = trpcClient.useMutation(['collection.UpdateCollection']);
  const trpcUtils = trpcClient.useContext();
  const { data, isLoading, isError, error } = trpcClient.useQuery([
    'collection.GetCollection',
    { _id: props._id },
  ]);

  function handleCollectionEdit({ title, color, description }: collectionOmitIdT) {
    mutation.mutate(
      {
        _id: props._id,
        title: title,
        color: color,
        description: description,
      },
      {
        onSuccess: () => trpcUtils.invalidateQueries(['collection.GetCollections']),
      },
    );
  }

  if (isLoading || !data?.collection) {
    return <Text>Loading collection details...</Text>;
  }

  if (isError) {
    return <Text>Error loading collection details: {error?.message}</Text>;
  }

  return (
    <CollectionEditForm collection={data.collection} handleCollectionEdit={handleCollectionEdit} />
  );
}

interface CollectionEditFormProps {
  collection: collectionT;
  handleCollectionEdit: ({ title, color, description }: collectionOmitIdT) => void;
}

/**
 * Only render form if collection is known to exist
 * Note this takes a copy of the data (does not reflect background changes)
 * https://tkdodo.eu/blog/react-query-and-forms
 * (I couldn't get the background controlled form to work properly yet).
 * @param collection
 * @param handleCollectionEdit
 * @constructor
 */
function CollectionEditForm({ collection, handleCollectionEdit }: CollectionEditFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<collectionOmitIdT>({
    resolver: zodResolver(collectionOmitIdZ),
    defaultValues: collection,
  });

  return (
    <form noValidate onSubmit={handleSubmit(handleCollectionEdit)}>
      <Stack spacing='sm'>
        <TextInput
          label='Title'
          required
          {...register('title')}
          description='Displayed front and centre.'
          error={errors?.title?.message}
        />
        <Textarea
          description='Add some more detail.'
          label='Description'
          placeholder={`There's still space to add a description!`}
          {...register('description')}
        />
        <Controller
          control={control}
          name='color'
          render={({ field: { value, onChange } }) => (
            <ColorControl label='Colour' onChange={onChange} value={value} />
          )}
        />
        <Button type='submit'>Save</Button>
      </Stack>
    </form>
  );
}
