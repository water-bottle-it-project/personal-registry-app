import {
  Box,
  Button,
  Container,
  Group,
  PasswordInput,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { resetNavigationProgress } from '@mantine/nprogress';
import { IconDeviceFloppy, IconFingerprint, IconRotateClockwise2 } from '@tabler/icons';
import { IconCheck, IconX } from '@tabler/icons';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { useAuthUser } from 'next-firebase-auth';
import { appendErrors, Controller, useForm } from 'react-hook-form';
import { StringDigit } from 'type-fest/source/internal';
import { setErrorMap } from 'zod';

import { trpcClient } from '~clientUtils/trpcClient';
import { ColorControl } from '~components/collection/ColorControl';
import { User } from '~server/models/user';

/*
function handlePasswordUpdate({ ogPassword, newPassword }) {
  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, email, password).catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      setError('email', { type: 'server', message: error.message }, { shouldFocus: true });
    } else {
      setError('password', { type: 'server', message: error.message }, { shouldFocus: true });
    }
  });
}*/
function successNotif(dispMessage: string) {
  showNotification({
    autoClose: 8000,
    icon: <IconCheck />,
    title: 'Success!',
    color: 'teal',
    message: dispMessage,
  });
}

type PasswordUpdateType = {
  originalPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export function PasswordUpdateForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<PasswordUpdateType>();

  const onSubmit = handleSubmit(data => {
    // check passwords match

    // passwords don't match
    if (data.confirmNewPassword != data.newPassword) {
      setError(
        'confirmNewPassword',
        { type: 'user', message: "Passwords don't match." },
        { shouldFocus: true },
      );
      setError(
        'newPassword',
        { type: 'user', message: "Passwords don't match." },
        { shouldFocus: true },
      );
      return;
    }
    // first need to reauth the user
    const auth = getAuth();
    const user = auth.currentUser!;

    const credential = EmailAuthProvider.credential(user?.email || '', data.originalPassword);

    // attempt reauth, catch wrong password error
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated, have a crack at updating password
        changePassword(data.newPassword);

        // success
        successNotif('Password was updated successfully');
        reset();
      })
      .catch(error => {
        // An error ocurred
        // ...
        setError(
          'originalPassword',
          { type: 'server', message: error.message },
          { shouldFocus: true },
        );
      });
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack>
          <PasswordInput
            description='Must be at least 6 characters long.'
            icon={<IconFingerprint size={16} />}
            id='originalPassword'
            label='Current Password'
            placeholder='Your current password'
            required
            {...register('originalPassword')}
            error={errors?.originalPassword?.message}
          />

          <PasswordInput
            description='Must be at least 6 characters long.'
            icon={<IconFingerprint size={16} />}
            id='newPassword'
            label='New Password'
            placeholder='Your new password'
            required
            {...register('newPassword')}
            error={errors?.newPassword?.message}
          />

          <PasswordInput
            description='Must be identical'
            icon={<IconFingerprint size={16} />}
            id='confirmNewPassword'
            label=' Repeat New Password'
            placeholder='Your new password (again)'
            required
            {...register('confirmNewPassword')}
            error={errors?.confirmNewPassword?.message}
          />
        </Stack>
        <Space h='xs' />
        <Button ml={10} type='submit'>
          Submit
        </Button>
      </form>
    </>
  );
}

function changePassword(newPass: string) {
  const auth = getAuth();

  const user = auth && auth?.currentUser;

  updatePassword(user!, newPass)
    .then(() => {
      //  able to update pass
    })
    .catch(error => {
      // not able to update password
    });
}
