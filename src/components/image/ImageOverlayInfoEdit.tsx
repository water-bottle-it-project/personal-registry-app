import {
  Box,
  createStyles,
  Group,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconDownload, IconEdit, IconTrash } from '@tabler/icons';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface ImageCardProps {
  _id: string;
  caption: string;
  url: string;
  userId: string;
}

type FormData = {
  firstName: string;
  lastName: string;
};

export function ImageOverlayInfoEdit(props: ImageCardProps) {
  const { classes } = useStyles();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(({ firstName, lastName }) => {
    console.log(firstName, lastName);
  }); // firstName and lastName will have correct type
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
      <form onSubmit={onSubmit}>
        <label>Last Name</label>

        <div>
          <Title order={2}>Information</Title>
          <Space h='lg' />
          <Text className={classes.infoHeader}>Title</Text>
          <Stack spacing='sm'>
            <TextInput
              className={classes.infoText}
              // description='Displayed front and centre.'
              // error={errors?.title?.message}
              // label='Title'
              required
              {...register('firstName')}
            />
          </Stack>
          <Space h='xs' />
          <Text className={classes.infoHeader}>Date</Text>
          <Stack spacing='sm'>
            <TextInput
              className={classes.infoText}
              // description='Displayed front and centre.'
              // error={errors?.title?.message}
              // label='Title'
              required
              {...register('firstName')}
            />
          </Stack>
          <Space h='xs' />
          <Text className={classes.infoHeader}>Location</Text>
          <Stack spacing='sm'>
            <TextInput
              className={classes.infoText}
              // description='Displayed front and centre.'
              // error={errors?.title?.message}
              // label='Title'
              required
              {...register('firstName')}
            />
          </Stack>
        </div>
        {/* <input type='submit' /> */}
      </form>
      <div className={classes.buttonGroup}>
        <UnstyledButton className={classes.button}>
          <Link href={`/images?edit=${props._id}`} passHref>
            <Group spacing={5}>
              <IconEdit />
              <Text>Edit</Text>
            </Group>
          </Link>
        </UnstyledButton>
        <UnstyledButton className={classes.button}>
          <Group className={classes.delete} spacing={5}>
            <IconTrash />
            <Text>Delete</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton className={classes.button}>
          <Group spacing={5}>
            <IconDownload />
            <Text>Download</Text>
          </Group>
        </UnstyledButton>
      </div>
    </Box>
  );
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
