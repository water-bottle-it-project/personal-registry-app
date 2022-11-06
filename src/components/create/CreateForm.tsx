import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from '@firebase/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { Group, Stack, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useAuthUser } from 'next-firebase-auth';
import { useForm } from 'react-hook-form';

import { firebaseMetadata } from '~clientUtils/firebaseMetadata';
import { trpcClient } from '~clientUtils/trpcClient';
import { CreateFormMemoryInfo } from '~components/create/CreateFormMemoryInfo';
import { CreateFormPhotos } from '~components/create/CreateFormPhotos';
import { CreateFormTop } from '~components/create/CreateFormTop';
import { ScrollToTop } from '~components/util/ScrollToTop';
import type { collectionSelectItemT } from '~types/collectionT';
import type { memoryCreateFormRequestT, memoryCreateFormT } from '~types/memoryT';
import { memoryCreateFormZ } from '~types/memoryT';
import type { photoFormCreateRequestT } from '~types/photoT';

/**
 * Initialises the create memory form and holds its child component parts.
 * Uses prop-drilling instead of useFormContext for simplicity + reducing # of re-renders.
 * @constructor
 */
export function CreateForm() {
  const formMethods = useForm<memoryCreateFormT>({
    resolver: zodResolver(memoryCreateFormZ),
    defaultValues: {
      date: [undefined, undefined],
      // Prevent undefined access of photos when calling reset on an empty form
      photos: [],
    },
  });

  const { data } = trpcClient.useQuery(['collection.GetCollections'], {
    placeholderData: { collections: [] },
  });

  const trpcUtils = trpcClient.useContext();
  const creation = trpcClient.useMutation(['memory.CreateMemory']);

  const router = useRouter();

  const { id: userId } = useAuthUser();

  async function handleMemoryCreate(memory: memoryCreateFormT) {
    if (!userId) {
      formMethods.setError('title', {
        type: 'custom',
        message: 'Unauthenticated user - try again later.',
      });
      return;
    }

    const photoDimRequests = memory.photos.map(async p => {
      if (!p._thumbnail) {
        return { height: 0, width: 0 };
      }
      const img = new Image();
      img.src = p._thumbnail;
      await img.decode();
      return { height: img.height, width: img.width };
    });

    const photoDims = await Promise.all(photoDimRequests);

    // Get the folder with the user id
    const userStorageRef = storageRef(getStorage(), userId);

    // Upload and get download url promises
    const fileUploadRequests = memory.photos.map(async p => {
      const fileRef = storageRef(userStorageRef, `${p._dir}/${p._file.name}`);
      const fileUploadResult = await uploadBytes(fileRef, p._file, firebaseMetadata);
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
      height: photoDims[index].height,
      width: photoDims[index].width,
    }));

    // Create a CreateMemory TRPC backend request
    const newMemory: memoryCreateFormRequestT = {
      title: memory.title,
      description: memory.description,
      firstDate: memory.date[0],
      lastDate: memory.date[1],
      photos: newPhotos,
      collections: memory.collections,
    };

    // Store memory and photo with urls in DB.
    creation.mutate(newMemory, {
      onSuccess: async data => {
        await trpcUtils.invalidateQueries('memory.GetMemories');
        showNotification({
          title: 'Success!',
          message: `Memory '${data.title}' successfully created.`,
          icon: <IconCheck />,
        });
        await router.push(`/memory/${data._id}`);
        memory.photos.forEach(p => {
          URL.revokeObjectURL(p._thumbnail);
        });
      },
      onError: () => {
        showNotification({
          icon: <IconX />,
          color: 'red',
          title: 'Error!',
          message: 'Error creating memory.',
        });
      },
    });
  }

  if (!data?.collections) {
    // No need to check for isLoading since there is placeholderData.
    return (
      <Stack spacing='sm'>
        <Group position='apart'>
          <Title>Create a memory</Title>
        </Group>
        <Text>Loading collections for creating memory...</Text>
      </Stack>
    );
  }

  const collections: collectionSelectItemT[] = data.collections.map(c => ({
    value: c._id,
    label: c.title,
  }));

  return (
    <>
      <form noValidate onSubmit={formMethods.handleSubmit(handleMemoryCreate)}>
        <Stack spacing='sm'>
          <CreateFormTop {...formMethods} />
          <CreateFormMemoryInfo collections={collections} {...formMethods} />
          <CreateFormPhotos {...formMethods} />
        </Stack>
      </form>
      <ScrollToTop bottom={70} />
    </>
  );
}
