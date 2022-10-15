import 'react-18-image-lightbox/style.css';

import { Container, Space, Switch } from '@mantine/core';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { MemoryHeader } from '~components/memory/MemoryHeader';
import { MemoryImage } from '~components/memory/MemoryImage';
import { MemoryImageGrid } from '~components/memory/MemoryImageGrid';
import { MemorySkeleton } from '~components/memory/MemorySkeleton';

interface MemoryIndexProps {
  _id: string;
}

export function MemoryIndex({ _id }: MemoryIndexProps) {
  const [gridView, setGridView] = useState(false);

  const { data, isLoadingError, isLoading } = trpcClient.useQuery(['memory.GetMemory', { _id }]);
  if (isLoading || !data?.memory) {
    return <MemorySkeleton />;
  }
  if (isLoadingError) {
    return <div>Error loading memory</div>;
  }
  const { title, collections, description, firstDate, lastDate, photos } = data.memory;

  return (
    <>
      <MemoryHeader
        _id={_id}
        collections={collections}
        description={description}
        firstDate={firstDate}
        lastDate={lastDate}
        photos={photos}
        title={title}
      />
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
          <MemoryImageGrid photos={photos} />
        ) : (
          photos.map((p, i) => <MemoryImage key={p._id} {...p} index={i} total={photos.length} />)
        )}
        <Space h='xl' />
      </Container>
    </>
  );
}
