import 'react-18-image-lightbox/style.css';

import { Container, Space, Switch } from '@mantine/core';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { MemoryHeader } from '~components/memory/MemoryHeader';
import { MemoryPhoto } from '~components/memory/MemoryPhoto';
import { MemoryPhotoGrid } from '~components/memory/MemoryPhotoGrid';
import { MemorySkeleton } from '~components/memory/MemorySkeleton';
import { showFailureNotification } from '~components/util/notificationHelpers';

interface MemoryIndexProps {
  _id: string;
}

export function MemoryIndex({ _id }: MemoryIndexProps) {
  const [gridView, setGridView] = useState(false);
  const router = useRouter();

  const { data, isLoadingError, isLoading, error } = trpcClient.useQuery([
    'memory.GetMemory',
    { _id },
  ]);
  if (isLoadingError) {
    showFailureNotification(error?.message, `memory.GetMemory(${_id})`);
    void router.replace('/memories');
    return <MemorySkeleton />;
  } else if (isLoading || !data?.memory) {
    return <MemorySkeleton />;
  }
  const { title, collections, description, firstDate, lastDate, photos } = data.memory;

  return (
    <>
      <NextSeo title={title} />
      <MemoryHeader
        _id={_id}
        collections={collections}
        description={description}
        firstDate={firstDate}
        lastDate={lastDate}
        photos={photos}
        title={title}
      />

      {data.memory.photos.length > 0 && (
        <>
          <Space h='xl' />
          <Container size='xl'>
            <Switch
              checked={gridView}
              label={`${gridView ? 'Grid View' : 'Stacked View'}`}
              onChange={event => setGridView(event.target.checked)}
              size='md'
            />
            <Space h='xl' />
            {gridView ? (
              <MemoryPhotoGrid photos={photos} />
            ) : (
              photos.map((p, i) => (
                <MemoryPhoto key={p._id} {...p} index={i} total={photos.length} />
              ))
            )}
            <Space h='xl' />
          </Container>
        </>
      )}
    </>
  );
}
