import { Button, Container, createStyles, SimpleGrid, Space, Text, Title } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';

interface DeleteOverlayProps {
  title: string;
  setConfirmation: Dispatch<SetStateAction<boolean>>;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export function DeleteOverlay({ title, setConfirmation, setOpened }: DeleteOverlayProps) {
  const { classes } = useStyles();
  return (
    <Container className={classes.wrapper}>
      <Title align='center' order={1}>
        Are you sure you want to delete the collection{' '}
        <Text inherit span variant='gradient'>
          {title}
        </Text>
        ?
      </Title>
      <Space h='xl' />
      <SimpleGrid
        breakpoints={[
          { maxWidth: 'lg', cols: 3, spacing: 'md' },
          { maxWidth: 'sm', cols: 1, spacing: 'sm' },
        ]}
        cols={4}
        spacing='xl'
      >
        <div />
        <Button onClick={() => setConfirmation(true)}>Yes</Button>
        <Button onClick={() => setOpened(false)}>No</Button>
        <div />
      </SimpleGrid>
      <Space h='xl' />
      <Text align='center'>This action is irreversible!</Text>
    </Container>
  );
}

const useStyles = createStyles(theme => ({
  wrapper: {
    justifyContent: 'center',
  },
}));
