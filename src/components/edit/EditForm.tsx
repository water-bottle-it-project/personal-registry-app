import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Text } from '@mantine/core';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useAuthUser } from 'next-firebase-auth';
import { useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import { EditFormMemoryInfo } from '~components/edit/EditFormMemoryInfo';
import { EditFormPhotos } from '~components/edit/EditFormPhotos';
import { EditFormTop } from '~components/edit/EditFormTop';
import type {
  memoryEditFormRequestT,
  memoryEditFormT,
  memoryIdOnlyT,
  memoryWithPhotosToEditT,
} from '~types/memory/memoryForm';
import { memoryEditFormZ } from '~types/memory/memoryForm';
import type { photoFormEditRequestT } from '~types/photo/photo';

export function EditForm({ _id }: memoryIdOnlyT) {
  const router = useRouter();
  const { data, isLoading, isLoadingError } = trpcClient.useQuery(['memory.GetMemory', { _id }]);

  if (isLoading || !data?.memory) {
    return <Text>Loading memory details...</Text>;
  }

  if (isLoadingError) {
    void router.push('/timeline');
    return <Text>Error loading memory to edit: memory doesn't exist</Text>;
  }

  // Process existing photos from server
  const existingPhotos = data.memory.photos.map(p => {
    return { ...p, _dir: nanoid(), photoDate: p.photoDate ? new Date(p.photoDate) : null };
  });

  const existingMemory: memoryWithPhotosToEditT = {
    ...data.memory,
    date: [new Date(data.memory.firstDate), new Date(data.memory.lastDate)],
    photos: existingPhotos,
  };
  return <EditFormPopulated memory={existingMemory} />;
}

interface EditFormPopulatedProps {
  memory: memoryWithPhotosToEditT;
}

function EditFormPopulated({ memory }: EditFormPopulatedProps) {
  const { id: userId } = useAuthUser();
  const mutation = trpcClient.useMutation(['memory.UpdateMemory']);

  async function handleMemoryEdit(memory: memoryEditFormT) {
    if (!userId) {
      formMethods.setError('title', {
        type: 'custom',
        message: 'Unauthenticated user - try again later.',
      });
      return;
    }

    const userStorageRef = ref(getStorage(), userId);

    const fileUploadRequests = memory.photos.map(async p => {
      // Don't re-upload if the image is unchanged
      if (p.url) {
        return p.url;
      }
      const fileRef = ref(userStorageRef, `${p._dir}/${p._file.name}`);
      const fileUploadResult = await uploadBytes(fileRef, p._file);
      return await getDownloadURL(fileUploadResult.ref);
    });

    const fileUrls = await Promise.all(fileUploadRequests);
    const editedPhotos: photoFormEditRequestT[] = memory.photos.map((p, index) => ({
      _id: p._id,
      caption: p.caption,
      photoDate: p.photoDate,
      location: p.location,
      url: fileUrls[index],
    }));

    const editedMemory: memoryEditFormRequestT = {
      _id: memory._id,
      title: memory.title,
      description: memory.description,
      firstDate: memory.date[0],
      lastDate: memory.date[1],
      photos: editedPhotos,
    };

    console.log(editedMemory);
    mutation.mutate(editedMemory);
  }

  const formMethods = useForm<memoryEditFormT>({
    defaultValues: memory,
    resolver: async (data, context, options) => {
      console.log('form data', data);
      console.log('validation result', await zodResolver(memoryEditFormZ)(data, context, options));
      return zodResolver(memoryEditFormZ)(data, context, options);
    },
  });

  return (
    <form noValidate onSubmit={formMethods.handleSubmit(handleMemoryEdit)}>
      <Stack spacing='sm'>
        <EditFormTop {...formMethods} />
        <EditFormMemoryInfo {...formMethods} />
        <EditFormPhotos {...formMethods} />
      </Stack>
    </form>
  );
}
