import {
  ActionIcon,
  Center,
  FileButton,
  Grid,
  Image,
  Input,
  Paper,
  Space,
  Stack,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconGripVertical, IconReplace, IconTrash, IconZoomIn } from '@tabler/icons';

import { useDragDropStyles } from '~components/create/dragDropStyles';
import { IMAGE_MIME_TYPES_FILE_BUTTON } from '~components/create/mimeTypes';
import { useTextareaStyles } from '~components/create/textareaStyles';
import gradient from '~components/homepage/gradient.png';

/**
 * Demo placeholder
 * @constructor
 */
export function CreateFormPhotoCardDemo() {
  const { classes } = useDragDropStyles();
  const { classes: textareaClasses } = useTextareaStyles();

  function setFile() {
    console.log('set file: CreateFormPhotoCardDemo');
  }

  return (
    <Paper className={classes.item}>
      <div className={classes.dragHandle}>
        <IconGripVertical size={18} stroke={1.5} />
      </div>
      <Stack pl='xs' pr='md'>
        <Tooltip label='Delete photo' position='right'>
          <ActionIcon color='red' size='lg' variant='light'>
            <IconTrash />
          </ActionIcon>
        </Tooltip>

        <FileButton accept={IMAGE_MIME_TYPES_FILE_BUTTON} onChange={setFile}>
          {props => (
            <Tooltip label='Replace photo' position='right'>
              <ActionIcon color='indigo' size='lg' variant='light' {...props}>
                <IconReplace />
              </ActionIcon>
            </Tooltip>
          )}
        </FileButton>

        <Tooltip label='View zoomed in' position='right'>
          <ActionIcon color='green' size='lg' variant='light'>
            <IconZoomIn />
          </ActionIcon>
        </Tooltip>
      </Stack>

      <Grid sx={{ flexGrow: 1 }}>
        <Grid.Col sm={4}>
          <Center sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Input.Label>Preview: #1/n</Input.Label>
              <Image
                alt='Demo photo card preview'
                fit='cover'
                height={180}
                radius='sm'
                src={gradient.src}
                width='100%'
              />
            </Stack>
          </Center>
        </Grid.Col>
        <Grid.Col sm={4}>
          <Textarea
            classNames={textareaClasses}
            description='Just for this photo.'
            label='Caption'
            placeholder='Write a few extra details...'
          />
        </Grid.Col>
        <Grid.Col sm={4}>
          <DatePicker
            description='Date of this particular photo'
            label='Photo date'
            placeholder='Click to add a date.'
          />
          <Space h='md' />
          <TextInput
            description='Just text for now.'
            label='Location'
            placeholder='Gravity Falls'
          />
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
