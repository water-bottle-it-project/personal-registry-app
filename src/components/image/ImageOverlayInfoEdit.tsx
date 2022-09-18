import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  createStyles,
  Group,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  IconCheck,
  IconDeviceFloppy,
  IconDownload,
  IconEdit,
  IconRotateClockwise2,
  IconTrash,
} from '@tabler/icons';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { trpcClient } from '~clientUtils/trpcClient';
// import type { photoWithMemoryT } from '~types/photo/photo';
// import { photoBase } from '~types/photo/photo';

interface ImageCardProps {
  _id: string;
  caption: string;
  url: string;
}

interface photoBaseT {
  caption: string;
}

const useStyles = createStyles(theme => ({
  infoHeader: {
    fontWeight: 600,
    fontSize: theme.fontSizes.lg,
  },
  infoText: {
    fontWeight: 400,
    fontSize: theme.fontSizes.md,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  button: {
    margin: '0 10px',
  },
  delete: {
    color: theme.colors.red,
  },
}));

interface EditFormProps {
  photo: ImageCardProps;
  handleEdit: ({ caption }: photoBaseT) => void;
}

function EditForm({ photo, handleEdit }: EditFormProps) {
  const { classes } = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<photoBaseT>({
    resolver: zodResolver(z.object({ caption: z.string().trim().optional() })),
    defaultValues: photo,
  });

  // const onSubmit = (data: any) => console.log(data);

  return (
    <Box
      sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4],
        borderRadius: theme.radius.xs,
        padding: theme.spacing.xl,
      })}
    >
      <form noValidate onSubmit={handleSubmit(handleEdit)}>
        <div>
          <Title order={2}>Information</Title>
          <Space h='lg' />
          <Stack spacing='sm'>
            <TextInput
              className={classes.infoText}
              // description='Displayed front and centre.'
              // error={errors?.caption?.message}
              // label='Title'
              required
              {...register('caption')}
            />
          </Stack>
          <Space h='xs' />
        </div>
      </form>
      <div className={classes.buttonGroup}>
        <input type='submit' />
        <UnstyledButton
          className={classes.button}
          onClick={() => {
            reset();
          }}
        >
          <Group className={classes.delete} spacing={5}>
            <IconRotateClockwise2 />
            <Text>Reset</Text>
          </Group>
        </UnstyledButton>
      </div>
    </Box>
  );
}

export function ImageOverlayInfoEdit(props: ImageCardProps) {
  const mutation = trpcClient.useMutation(['image.UpdateImage']);
  // const trpcUtils = trpcClient.useContext();

  function handleEdit({ caption }: photoBaseT) {
    console.log('fuck me');
    mutation.mutate(
      {
        _id: props._id,
        caption: caption,
      },
      {
        onSuccess: async () => {
          showNotification({
            icon: <IconCheck />,
            title: 'Success!',
            message: 'Image successfully updated.',
          });
        },
      },
    );
  }

  return (
    <>
      <Space h='sm' />
      <EditForm handleEdit={handleEdit} photo={props} />
    </>
  );
}
