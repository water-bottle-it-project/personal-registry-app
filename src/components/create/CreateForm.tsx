import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mantine/core';
import { useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { CreateFormMemoryInfo } from '~components/create/CreateFormMemoryInfo';
import { CreateFormTop } from '~components/create/CreateFormTop';
import type { memoryOmitIdT } from '~types/memory/memory';

/**
 * Uses prop-drilling instead of useFormContext for simplicity in reducing # of re-renders.
 * @constructor
 */
export function CreateForm() {
  const formMethods = useForm<memoryOmitIdT>();

  const trpcUtils = trpcClient.useContext();
  const creation = trpcClient.useMutation(['memory.CreateMemory']);

  function handleMemoryCreate(memory: memoryOmitIdT) {
    console.log(memory);
    creation.mutate(
      { ...memory },
      {
        onSuccess: async () => {
          await trpcUtils.invalidateQueries('memory.GetMemories');
          console.log('hello');
        },
        onError: () => {
          console.log('error');
        },
      },
    );
  }

  return (
    <>
      <form noValidate onSubmit={formMethods.handleSubmit(handleMemoryCreate)}>
        <Stack spacing='sm'>
          <CreateFormTop />
          <CreateFormMemoryInfo {...formMethods} />
        </Stack>
      </form>
    </>
  );
}
