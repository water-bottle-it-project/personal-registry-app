import { zodResolver } from '@hookform/resolvers/zod';
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

import { trpcClient } from '~clientUtils/trpcClient';
import type { photoBaseT, photoWithMemoryT } from '~types/photo/photo';
import { photoBase } from '~types/photo/photo';

interface ImageCardProps {
  _id: string;
  caption: string;
  url: string;
}

type FormData = {
  firstName: string;
  lastName: string;
};

// export function ImageOverlayInfoEdit(props: ImageCardProps) {
//   const { classes } = useStyles();
//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();
//   const onSubmit = handleSubmit(({ firstName, lastName }) => {
//     console.log(firstName, lastName);
//   }); // firstName and lastName will have correct type
//   return (
//     <Box
//       sx={theme => ({
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4],
//         borderRadius: theme.radius.xs,
//         padding: theme.spacing.xl,
//       })}
//     >
//       <form onSubmit={onSubmit}>
//         <div>
//           <Title order={2}>Information</Title>
//           <Space h='lg' />
//           <Text className={classes.infoHeader}>Title</Text>
//           <Stack spacing='sm'>
//             <TextInput
//               className={classes.infoText}
//               // description='Displayed front and centre.'
//               // error={errors?.title?.message}
//               // label='Title'
//               required
//               {...register('firstName')}
//             />
//           </Stack>
//           <Space h='xs' />
//           <Text className={classes.infoHeader}>Date</Text>
//           <Stack spacing='sm'>
//             <TextInput
//               className={classes.infoText}
//               // description='Displayed front and centre.'
//               // error={errors?.title?.message}
//               // label='Title'
//               required
//               {...register('firstName')}
//             />
//           </Stack>
//           <Space h='xs' />
//           <Text className={classes.infoHeader}>Location</Text>
//           <Stack spacing='sm'>
//             <TextInput
//               className={classes.infoText}
//               // description='Displayed front and centre.'
//               // error={errors?.title?.message}
//               // label='Title'
//               required
//               {...register('firstName')}
//             />
//           </Stack>
//         </div>
//         {/* <input type='submit' /> */}
//       </form>
//       <div className={classes.buttonGroup}>
//         <UnstyledButton className={classes.button}>
//           <Link href={`/images?edit=${props._id}`} passHref>
//             <Group spacing={5}>
//               <IconEdit />
//               <Text>Edit</Text>
//             </Group>
//           </Link>
//         </UnstyledButton>
//         <UnstyledButton className={classes.button}>
//           <Group className={classes.delete} spacing={5}>
//             <IconTrash />
//             <Text>Delete</Text>
//           </Group>
//         </UnstyledButton>
//         <UnstyledButton className={classes.button}>
//           <Group spacing={5}>
//             <IconDownload />
//             <Text>Download</Text>
//           </Group>
//         </UnstyledButton>
//       </div>
//     </Box>
//   );
// }

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
  // photo: photoWithMemoryT;
  handleEdit: ({ caption, location, photoDate }: photoBaseT) => void;
}

function EditForm({ handleEdit }: EditFormProps) {
  const { classes } = useStyles();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<photoBaseT>({
    resolver: zodResolver(photoBase),
    // defaultValues: photo,
  });

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
      <form onSubmit={handleSubmit(handleEdit)}>
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
              {...register('caption')}
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
              {...register('photoDate')}
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
              {...register('location')}
            />
          </Stack>
        </div>
        {/* <input type='submit' /> */}
      </form>
      <div className={classes.buttonGroup}>
        <UnstyledButton className={classes.button} type='submit'>
          <Group spacing={5}>
            <IconDeviceFloppy />
            <Text>Save</Text>
          </Group>
        </UnstyledButton>
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

export function ImageOverlayInfoEdit(props: ImageCardProps) {
  const mutation = trpcClient.useMutation(['image.UpdateImage']);
  const trpcUtils = trpcClient.useContext();

  function handleEdit({ caption, location, photoDate }: photoBaseT) {
    console.log('submitted');
    mutation.mutate(
      {
        _id: props._id,
        caption: caption,
        location: location,
        photoDate: photoDate,
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
      {/* <Text color='dimmed' size='xs'>
        Collection id: {props._id}
      </Text> */}
      <Space h='sm' />
      <EditForm handleEdit={handleEdit} />
    </>
  );
}
