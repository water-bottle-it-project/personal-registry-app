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
import { IconCalendarPlus, IconCheck, IconDeviceFloppy, IconRotateClockwise2 } from '@tabler/icons';
import router from 'next/router';
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
    bottom: '0px',
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
        <Title order={2}>Information</Title>
        <Space h='lg' />
        <Text className={classes.infoHeader}>Caption</Text>
        <TextInput className={classes.infoText} {...register('caption')} />
        <Space h='xs' />
        <Text className={classes.infoHeader}>Date</Text>
        <Controller
          control={control}
          name='photoDate'
          render={({ field: { value, onChange, ref, ...field }, fieldState: { error } }) => (
            <DatePicker
              dropdownPosition='bottom-start'
              error={error?.message}
              firstDayOfWeek='sunday'
              icon={<IconCalendarPlus size={16} />}
              inputFormat='D MMMM YYYY'
              onChange={onChange}
              placeholder='Click to add a date.'
              ref={ref}
              value={value}
              {...field}
            />
          )}
        />
        <Space h='xs' />
        <Text className={classes.infoHeader}>Location</Text>
        <TextInput className={classes.infoText} {...register('location')} />
        <Space h='xs' />
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
        </div>
      </form>
    </Box>
  );
}

export function ImageOverlayInfoEdit(props: photoBaseWithIdT) {
  const mutation = trpcClient.useMutation(['images.updateImage']);
  const trpcUtils = trpcClient.useContext();

  const handleEdit = async ({ caption, location, photoDate }: photoBaseT) => {
    // console.log('caption', caption);
    // console.log('photo id', props._id);
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
          await trpcUtils.invalidateQueries(['images.listImages']);
          await trpcUtils.invalidateQueries(['images.getImage', { _id: props._id }]);
          await router.push(`/images?view=${props._id}`, undefined, { shallow: true });
          showNotification({
            icon: <IconCheck />,
            title: 'Success!',
            message: 'Image successfully updated.',
          });
        },
      },
    );
  };

  return <EditForm handleEdit={handleEdit} photo={props} />;
}
