import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { Affix, Button, Stack, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useAuthUser } from 'next-firebase-auth';
import { useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { CreateFormMemoryInfo } from '~components/create/CreateFormMemoryInfo';
import { CreateFormPhotos } from '~components/create/CreateFormPhotos';
import { CreateFormTop } from '~components/create/CreateFormTop';
import type { memoryCreateFormRequestT, memoryCreateFormT } from '~types/memory/memoryForm';
import { memoryCreateForm } from '~types/memory/memoryForm';
import type { photoFormCreateRequestT } from '~types/photo/photo';

/**
 * Initialises the create memory form and holds its child component parts.
 * Uses prop-drilling instead of useFormContext for simplicity + reducing # of re-renders.
 * @constructor
 */
export function CreateForm() {
  const formMethods = useForm<memoryCreateFormT>({
    resolver: async (data, context, options) => {
      console.log('form data', data);
      console.log('validation result', await zodResolver(memoryCreateForm)(data, context, options));
      return zodResolver(memoryCreateForm)(data, context, options);
    },
    defaultValues: {
      date: [undefined, undefined],
      // Prevent undefined access of photos when calling reset on an empty form
      photos: [],
    },
  });

  const trpcUtils = trpcClient.useContext();
  const creation = trpcClient.useMutation(['memory.CreateMemory']);

  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();

  const { id: userId } = useAuthUser();

  async function handleMemoryCreate(memory: memoryCreateFormT) {
    console.log('handleMemoryCreate', memory);
    if (!userId) {
      formMethods.setError('title', {
        type: 'custom',
        message: 'Unauthenticated user - try again later.',
      });
      return;
    }

    // Get the folder with the user id
    const userStorageRef = ref(getStorage(), userId);

    // Upload and get download url promises
    const fileUploadRequests = memory.photos.map(async p => {
      const fileRef = ref(userStorageRef, `${p._dir}/${p._file.name}`);
      const fileUploadResult = await uploadBytes(fileRef, p._file);
      return await getDownloadURL(fileUploadResult.ref);
    });

    // Resolve all download urls
    const fileUrls = await Promise.all(fileUploadRequests);

    // Map photo urls to new photo instances
    const newPhotos: photoFormCreateRequestT[] = memory.photos.map((p, index) => ({
      caption: p.caption,
      photoDate: p.photoDate,
      location: p.location,
      url: fileUrls[index],
    }));

    // Create a CreateMemory TRPC backend request
    const newMemory: memoryCreateFormRequestT = {
      title: memory.title,
      description: memory.description,
      firstDate: memory.date[0],
      lastDate: memory.date[1],
      photos: newPhotos,
    };

    console.log(newMemory);
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
