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
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import {
  IconCalendarPlus,
  IconCheck,
  IconDeviceFloppy,
  IconDownload,
  IconEdit,
  IconRotateClockwise2,
  IconTrash,
} from '@tabler/icons';
import { Controller, useForm } from 'react-hook-form';

import { trpcClient } from '~clientUtils/trpcClient';
import type { photoBaseT, photoBaseWithIdT } from '~types/photo/photo';
import { photoBase } from '~types/photo/photo';

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
  photo: photoBaseWithIdT;
  handleEdit: ({ caption, location, photoDate }: photoBaseT) => void;
}

function EditForm({ photo, handleEdit }: EditFormProps) {
  const { classes } = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<photoBaseT>({
    resolver: async (data, context, options) => {
      // console.log('form data', data);
      // console.log('form context', context);
      // console.log('form options', options);
      console.log('validation result', await zodResolver(photoBase)(data, context, options));
      return zodResolver(photoBase)(data, context, options);
    },

    defaultValues: photo,
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
      <form noValidate onSubmit={handleSubmit(handleEdit)}>
        <div>
          <Title order={2}>Information</Title>
          <Space h='lg' />
          <Stack spacing='sm'>
            <TextInput className={classes.infoText} label='Title' {...register('caption')} />
            <TextInput className={classes.infoText} label='Location' {...register('location')} />
            <Controller
              control={control}
              name='photoDate'
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
          </Stack>
          <Space h='xs' />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
      <div className={classes.buttonGroup}>
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

export function ImageOverlayInfoEdit(props: photoBaseWithIdT) {
  const mutation = trpcClient.useMutation(['images.UpdateImage']);
  const trpcUtils = trpcClient.useContext();

  const handleEdit = async ({ caption, location, photoDate }: photoBaseT) => {
    console.log('caption', caption);
    console.log('photo id', props._id);
    mutation.mutate(
      {
        _id: props._id,
        caption: caption,
        location: location,
        photoDate: photoDate,
      },
      {
        onSuccess: async () => {
          // Auto-refresh without reload
          await trpcUtils.invalidateQueries(['images.ListImages', { _id: props._id }]);
          showNotification({
            icon: <IconCheck />,
            title: 'Success!',
            message: 'Image successfully updated.',
          });
        },
      },
    );
  };

  return (
    <>
      <Space h='sm' />
      <EditForm handleEdit={handleEdit} photo={props} />
    </>
  );
}
