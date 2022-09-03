import {
  Button,
  Container,
  createStyles,
  Modal,
  SimpleGrid,
  Space,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconRotateClockwise2, IconTrash } from '@tabler/icons';
import Router from 'next/router';
import { useEffect, useState } from 'react';

import { trpcClient } from '~clientUtils/trpcClient';

import { ColorEditor } from './ColorEditor';
import { DeleteOverlay } from './DeleteOverlay';

export interface EditCollectionProps {
  title: string;
  description: string;
  userId: string;
  color: string;
}

export function CollectionEditOverlay({ title, description, userId, color }: EditCollectionProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [name, setName] = useState(title);
  const [desc, setDesc] = useState(description);
  const [selectedColor, setSelectedColor] = useState(color);
  const [deleteConfirmation, setConfirmation] = useState(false);
  const [opened, setOpened] = useState(false);
  const [displayDeleteModal, setDeleteModal] = useState({
    title: '',
  });

  const update = trpcClient.useMutation(['collections.editCollection']);
  const remove = trpcClient.useMutation(['collections.removeCollection']);

  const handleEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    update.mutate({
      oldTitle: title,
      title: name,
      description: desc,
      userId: userId,
      color: selectedColor,
    });
    Router.reload();
  };

  useEffect(() => {
    const handleDelete = async () => {
      remove.mutate({
        title: name,
        userId: userId,
      });
      Router.reload();
    };

    if (deleteConfirmation) {
      handleDelete();
    }

    return () => setConfirmation(false);
  }, [deleteConfirmation, name, remove, title, userId]);

  const renderOverlay = (title: string, value: boolean | ((prevState: boolean) => boolean)) => {
    setOpened(value);
    setDeleteModal(previousState => {
      return { ...previousState, title: title };
    });
  };

  // TODO: set up error and success messages after editing/deleting

  return (
    <>
      <Modal
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        opened={opened}
        size='calc(100vw - 60%)'
        transition='fade'
        transitionDuration={250}
        transitionTimingFunction='ease'
      >
        <DeleteOverlay
          setConfirmation={setConfirmation}
          setOpened={setOpened}
          title={displayDeleteModal.title}
        />
      </Modal>
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
          <Space h='xl' />
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
              { maxWidth: 'lg', cols: 2, spacing: 'md' },
              { maxWidth: 'sm', cols: 1, spacing: 'sm' },
            ]}
            cols={4}
            spacing='xl'
          >
            <Button
              color='red'
              leftIcon={<IconTrash />}
              mt='xl'
              onClick={() => renderOverlay(title, true)}
              variant='outline'
            >
              Delete
            </Button>
            <div />
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
            <Button
              gradient={{ from: 'indigo', to: 'cyan' }}
              mt='xl'
              type='submit'
              variant='gradient'
            >
              Save
            </Button>
          </SimpleGrid>
          {update.error && <p>Something went wrong! {update.error.message}</p>}
        </form>
      </Container>
    </>
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
