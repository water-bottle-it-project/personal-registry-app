import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { CreateFormMemoryInfo } from '~components/create/CreateFormMemoryInfo';
import { CreateFormTop } from '~components/create/CreateFormTop';
import type { memoryFormOmitId } from '~types/memory/memoryForm';
import { memoryFormOmitIdZ } from '~types/memory/memoryForm';

/**
 * Uses prop-drilling instead of useFormContext for simplicity in reducing # of re-renders.
 * @constructor
 */
export function CreateForm() {
  const formMethods = useForm<memoryFormOmitId>({
    resolver: zodResolver(memoryFormOmitIdZ),
    defaultValues: { date: [undefined, undefined] },
  });

  const trpcUtils = trpcClient.useContext();
  const creation = trpcClient.useMutation(['memory.CreateMemory']);

  const router = useRouter();

  function handleMemoryCreate(memory: memoryFormOmitId) {
    console.log(memory);
    creation.mutate(
      { ...memory },
      {
        onSuccess: async data => {
          await trpcUtils.invalidateQueries('memory.GetMemories');
          showNotification({
            title: 'Success!',
            message: `Memory '${data.title}' successfully created.`,
            icon: <IconCheck />,
          });
          await router.push('/timeline');
        },
        onError: () => {
          showNotification({
            icon: <IconX />,
            color: 'red',
            title: 'Error!',
            message: 'Error creating memory.',
          });
        },
      },
    );
  }

  return (
    <>
      <form noValidate onSubmit={formMethods.handleSubmit(handleMemoryCreate)}>
        <Stack spacing='sm'>
          <CreateFormTop {...formMethods} />
          <CreateFormMemoryInfo {...formMethods} />
        </Stack>
      </form>
    </>
  );
}
