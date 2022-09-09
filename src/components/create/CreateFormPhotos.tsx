import { createStyles, Title } from '@mantine/core';
import type { DropzoneProps } from '@mantine/dropzone';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

import { CreateFormDropzone } from '~components/create/CreateFormDropzone';
import type { memoryCreateFormT } from '~types/memory/memoryForm';
import type { photoFormCreateT } from '~types/photo/photo';

export function CreateFormPhotos({ control }: UseFormReturn<memoryCreateFormT>) {
  const { classes, cx } = useStyles();

  const { fields, append, remove, move } = useFieldArray({
    name: 'photos',
    control,
  });

  const onDrop = useCallback<DropzoneProps['onDrop']>(
    acceptedFiles => {
      // Generate id and thumbnails for the photos.
      const photos: photoFormCreateT[] = acceptedFiles.map(p => ({
        _file: p,
        _thumbnail: URL.createObjectURL(p),
        _dir: nanoid(),
        photoDate: null,
        caption: '',
        location: '',
      }));

      append(photos);
    },
    [append],
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      move(result.source.index, result.destination.index);
    },
    [move],
  );

  console.log(fields);

  return (
    <>
      <Title order={2}>Add photos</Title>
      <CreateFormDropzone onDrop={onDrop} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => <div {...provided.droppableProps} ref={provided.innerRef} />}
        </Droppable>
      </DragDropContext>
    </>
  );
}

const useStyles = createStyles(theme => ({
  itemDragging: {
    boxShadow: theme.shadows.sm,
  },
}));
