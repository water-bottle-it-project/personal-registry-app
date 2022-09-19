import 'react-18-image-lightbox/style.css';

import { Container, Space, Switch } from '@mantine/core';
import { useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';
import { MemoryImage } from '~components/memory/MemoryImage';
import { MemoryImageGrid2 } from '~components/memory/MemoryImageGrid2';

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
          <MemoryImageGrid2 photos={photos} />
        ) : (
          photos.map(p => (
            <MemoryImage _id={p._id} key={p._id} photoDate={new Date()} url={p.url} />
          ))
        )}
        <Space h='xl' />
      </Container>
    </>
  );
}
