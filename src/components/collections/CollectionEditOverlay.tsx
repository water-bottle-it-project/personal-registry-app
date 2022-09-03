import { zodResolver } from '@hookform/resolvers/zod';
import type { NotificationProps } from '@mantine/core';
import {
  Button,
  Container,
  createStyles,
  Notification,
  SimpleGrid,
  Space,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconCheck, IconRotateClockwise2, IconTrash, IconX } from '@tabler/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import type { EditCollectionT } from '~types/editCollection';
import { editCollectionZ } from '~types/editCollection';

import { ColorEditor } from './ColorEditor';

export interface EditCollectionProps {
  title: string;
  description: string;
  userId: string;
  color: string;
}

export function CollectionEditOverlay({ title, description, userId, color }: EditCollectionProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [name, setName] = useState(title);
  const [desc, setDesc] = useState(description);
  const [selectedColor, setSelectedColor] = useState(color);

  const {
    handleSubmit,
    setError,
    formState: { errors, isValidating, isSubmitting, isSubmitSuccessful },
  } = useForm<EditCollectionT>({
    resolver: zodResolver(editCollectionZ),
  });

  const update = trpcClient.useMutation(['collections.editCollection']);

  const handleEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    update.mutate({
      oldTitle: title,
      title: name,
      description: desc,
      userId: userId,
      color: selectedColor,
    });
  };

  // TODO: set up error and success messages after editing AND handle color edits
  let notificationProps: Partial<NotificationProps> = {};
  if (isValidating || isSubmitting) {
    notificationProps = { loading: true, title: 'Saving changes' };
  } else if (isSubmitSuccessful) {
    notificationProps = { icon: <IconCheck size={18} />, color: 'teal', title: 'Successful!' };
  }

  return (
    <Container
      sx={theme => ({
        fontSize: theme.fontSizes.sm,
        padding: '0',
      })}
    >
      <Title order={1}>Edit Collection</Title>
      <Space h='md' />
      <form onSubmit={handleEdit}>
        <TextInput
          id='name'
          label='Collection Name'
          onChange={event => setName(event.currentTarget.value)}
          placeholder='Enter a collection name'
          value={name}
        />
        <Space h='xs' />
        <Textarea
          id='desc'
          label='Description'
          onChange={event => setDesc(event.currentTarget.value)}
          placeholder='Your comment'
          value={desc}
        />
        <Space h='xl' />
        <Title order={1}>Customize color</Title>
        <Space h='md' />
        <TextInput disabled hidden id='color' label='Select a color' value={selectedColor} />
        <ColorEditor selected={selectedColor} setSelectedColor={setSelectedColor} />
        <Space h='xs' />
        <div className={classes.colorGrid}>
          <div className={classes.colorContainer}>
            <Text>Selected</Text>
            <div
              className={classes.color}
              style={{ backgroundColor: theme.colors[selectedColor][2] }}
            />
          </div>

          <div className={classes.colorContainer}>
            <Text>Current</Text>
            <div className={classes.color} style={{ backgroundColor: theme.colors[color][2] }} />
          </div>
        </div>
        <Space h='xl' />
        <SimpleGrid
          breakpoints={[
            { maxWidth: 'lg', cols: 3, spacing: 'md' },
            { maxWidth: 'sm', cols: 1, spacing: 'sm' },
          ]}
          cols={4}
          spacing='xl'
        >
          <Button
            gradient={{ from: 'indigo', to: 'cyan' }}
            mt='xl'
            type='submit'
            variant='gradient'
          >
            Save
          </Button>
          <Button
            gradient={{ from: 'indigo', to: 'cyan' }}
            leftIcon={<IconRotateClockwise2 />}
            mt='xl'
            onClick={() => {
              setName(title);
              setDesc(description);
              setSelectedColor(color);
            }}
            variant='outline'
          >
            Reset
          </Button>
          <div />
          <Button color='red' leftIcon={<IconTrash />} mt='xl' variant='outline'>
            Delete
          </Button>
        </SimpleGrid>
        {update.error && <p>Something went wrong! {update.error.message}</p>}
      </form>
    </Container>
  );
}

const useStyles = createStyles(theme => ({
  colorGrid: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  colorContainer: {
    display: 'column',
  },
  color: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
}));
