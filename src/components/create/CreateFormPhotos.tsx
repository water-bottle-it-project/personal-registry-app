import { Title } from '@mantine/core';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

import { CreateFormDropzone } from '~components/create/CreateFormDropzone';
import type { memoryFormOmitId } from '~types/memory/memoryForm';

export function CreateFormPhotos({ control }: UseFormReturn<memoryFormOmitId>) {
  const { fields, append, remove, move } = useFieldArray({
    name: 'photos',
    control,
  });

  function onDrop() {
    console.log('dropped');
  }

  return (
    <>
      <Title order={2}>Add photos</Title>
      <CreateFormDropzone onDrop={onDrop} />
    </>
  );
}
