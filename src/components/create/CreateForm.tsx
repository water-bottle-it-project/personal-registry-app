import { zodResolver } from '@hookform/resolvers/zod';
import { Affix, Button, Stack, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconArrowUp, IconCheck, IconX } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { CreateFormMemoryInfo } from '~components/create/CreateFormMemoryInfo';
import { CreateFormPhotos } from '~components/create/CreateFormPhotos';
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
  const [scroll, scrollTo] = useWindowScroll();

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
          <CreateFormPhotos {...formMethods} />
        </Stack>
      </form>

      <Affix position={{ bottom: 70, right: 20 }}>
        <Transition mounted={scroll.y > 480} transition='slide-up'>
          {transitionStyles => (
            <Button
              leftIcon={<IconArrowUp size={16} />}
              onClick={() => scrollTo({ y: 0 })}
              style={transitionStyles}
              sx={{ width: 140 }}
              variant='light'
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
