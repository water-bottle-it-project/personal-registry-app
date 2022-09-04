import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Textarea, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { ColorControl } from '~components/collection/ColorControl';
import type { collectionIdOnlyT } from '~types/collection/collectionIdOnly';
import type { collectionOmitIdT } from '~types/collection/collectionOmitId';
import { collectionOmitIdZ } from '~types/collection/collectionOmitId';

export function CollectionEdit(props: collectionIdOnlyT) {
  const mutation = trpcClient.useMutation(['collection.UpdateCollection']);
  const trpcUtils = trpcClient.useContext();

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<collectionOmitIdT>({
    resolver: zodResolver(collectionOmitIdZ),
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
