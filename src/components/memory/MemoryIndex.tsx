import 'react-18-image-lightbox/style.css';

import { Container, Space, Switch } from '@mantine/core';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { MemoryImage } from '~components/memory/MemoryImage';
import { MemoryImageGrid } from '~components/memory/MemoryImageGrid';

import { MemoryHeader } from './MemoryHeader';

interface MemoryIndexProps {
  _id: string;
}

export function MemoryIndex({ _id }: MemoryIndexProps) {
  const [gridView, setGridView] = useState(false);

  const { data, isLoadingError, isLoading } = trpcClient.useQuery(['memory.GetMemory', { _id }]);
  if (isLoading || !data?.memory) {
    return <div>Loading...</div>;
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
          photos.map(p => <MemoryImage key={p._id} {...p} />)
        )}
        <Space h='xl' />
      </Container>
    </>
  );
}
