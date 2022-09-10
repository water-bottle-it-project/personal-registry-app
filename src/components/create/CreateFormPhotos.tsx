import 'react-medium-image-zoom/dist/styles.css';

import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  ActionIcon,
  Center,
  createStyles,
  FileButton,
  Grid,
  Group,
  Image,
  Input,
  Paper,
  Space,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import type { DropzoneProps } from '@mantine/dropzone';
import {
  IconCalendarPlus,
  IconGripVertical,
  IconLocation,
  IconReplace,
  IconTrash,
} from '@tabler/icons';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Controller, useFieldArray } from 'react-hook-form';
import Zoom from 'react-medium-image-zoom';

import { CreateFormDropzone } from '~components/create/CreateFormDropzone';
import { CreateFormPhotoCardDemo } from '~components/create/CreateFormPhotoCardDemo';
import { useTextareaStyles } from '~components/create/textareaStyles';
import type { memoryCreateFormT } from '~types/memory/memoryForm';
import type { photoFormCreateT } from '~types/photo/photo';

export function CreateFormPhotos({ control, register }: UseFormReturn<memoryCreateFormT>) {
  const { classes } = useDragDropStyles();
  const { classes: textareaClasses } = useTextareaStyles();

  const { fields, append, remove, move, update } = useFieldArray({
    name: 'photos',
    control,
  });

  const onDrop = useCallback<DropzoneProps['onDrop']>(
    acceptedFiles => {
      // Generate directory ids and thumbnails for the photos.
      // Photos will be stored in the Firebase storage bucket at /username/_dir/original_file_name.
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

  const [contained, setContained] = useState(false);

  const photoCards = fields.map((p, index) => (
    <Draggable draggableId={p._dir} index={index} key={p._dir}>
      {provided => (
        <Paper className={classes.item} ref={provided.innerRef} {...provided.draggableProps}>
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          <Stack pl='xs' pr='md'>
            <Tooltip label='Delete photo' position='right'>
              <ActionIcon color='red' onClick={() => remove(index)} size='lg' variant='light'>
                <IconTrash />
              </ActionIcon>
            </Tooltip>

            <FileButton accept={IMAGE_MIME_TYPES_FILE_BUTTON} onChange={setFile(index)}>
              {props => (
                <Tooltip label='Replace photo' position='right'>
                  <ActionIcon color='indigo' size='lg' variant='light' {...props}>
                    <IconReplace />
                  </ActionIcon>
                </Tooltip>
              )}
            </FileButton>
          </Stack>

          <Grid sx={{ flexGrow: 1 }}>
            <Grid.Col sm={4}>
              <Center sx={{ width: '100%' }}>
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Input.Label>{`${index + 1}/${fields.length}`}</Input.Label>
                  <Zoom>
                    <Image
                      alt={`Photo ${index + 1}/${fields.length}`}
                      fit={contained ? 'contain' : 'cover'}
                      height={180}
                      radius='sm'
                      src={p._thumbnail}
                      width='100%'
                    />
                  </Zoom>
                </Stack>
              </Center>
            </Grid.Col>
            <Grid.Col sm={4}>
              <Textarea
                classNames={textareaClasses}
                description='Just for this photo.'
                label='Caption'
                placeholder='Write a few extra details...'
                {...register(`photos.${index}.caption`)}
              />
            </Grid.Col>
            <Grid.Col sm={4}>
              <Controller
                control={control}
                name={`photos.${index}.photoDate`}
                render={({ field: { value, onChange, ref, ...field }, fieldState: { error } }) => (
                  <DatePicker
                    description='Date of this particular photo'
                    dropdownPosition='bottom-start'
                    error={error?.message}
                    firstDayOfWeek='sunday'
                    icon={<IconCalendarPlus size={16} />}
                    inputFormat='D MMMM YYYY'
                    label='Photo date'
                    onChange={onChange}
                    placeholder='Click to add a date.'
                    ref={ref}
                    value={value}
                    {...field}
                  />
                )}
              />
              <Space h='md' />
              <TextInput
                description='Just text for now.'
                icon={<IconLocation size={16} />}
                label='Location'
                placeholder='Gravity Falls'
                {...register(`photos.${index}.location`)}
              />
            </Grid.Col>
          </Grid>
        </Paper>
      )}
    </Draggable>
  ));

  // Curried function for updating a file for a photo card already in the list
  const setFile = (index: number) => (file: File) => {
    // Get old thumbnail blob link to clean up later
    const _thumbnailOld = fields[index]._thumbnail;

    // Insert new image
    update(index, {
      ...fields[index],
      _file: file,
      _thumbnail: URL.createObjectURL(file),
    });

    // Make sure to clean up old thumbnail to prevent memory leak.
    URL.revokeObjectURL(_thumbnailOld);
  };

  return (
    <>
      <Title order={2}>Add photos</Title>
      <CreateFormDropzone onDrop={onDrop} />
      <Group position='apart'>
        <Switch
          checked={contained}
          label={`Photo preview mode: ${
            contained ? 'contain photo within frame' : 'fill photo frame'
          }`}
          onChange={event => setContained(event.target.checked)}
        />
        <Text className={classes.helpText}>Tap any photo to zoom in</Text>
      </Group>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {photoCards}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CreateFormPhotoCardDemo />
    </>
  );
}

export const IMAGE_MIME_TYPES_FILE_BUTTON = 'image/png,image/gif,image/jpeg,image/webp';

export const useDragDropStyles = createStyles(theme => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.xs}px`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    marginBottom: theme.spacing.lg,
    boxShadow: theme.shadows.xs,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingRight: 0,
  },

  helpText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.dark[3],
    fontSize: theme.fontSizes.sm,
  },
}));
