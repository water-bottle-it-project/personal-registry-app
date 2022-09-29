import { Button, PasswordInput, Space, Stack, TextInput } from '@mantine/core';
import { IconFingerprint } from '@tabler/icons';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { useForm } from 'react-hook-form';

import { changeEmail, changePassword } from '~components/profile/CredentialChangers';

type PasswordUpdateType = {
  originalPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

type EmailUpdateType = {
  currentPassword: string;
  newEmail: string;
};

export function EmailUpdateForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EmailUpdateType>();

  const onSubmit = handleSubmit(data => {
    // first need to reauth the user
    const auth = getAuth();
    const user = auth.currentUser!;

    const credential = EmailAuthProvider.credential(user?.email || '', data.currentPassword);

    // attempt reauth, catch wrong password error
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated, have a crack at updating password
        changeEmail(data.newEmail);

        // success
        reset();
      })
      .catch(error => {
        // An error ocurred
        // ...
        setError(
          'currentPassword',
          { type: 'server', message: error.message },
          { shouldFocus: true },
        );
      });
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            description='Must be a valid email..'
            id='newEmail'
            label='New Email'
            placeholder='Your new email'
            required
            {...register('newEmail')}
            error={errors?.newEmail?.message}
          />

          <PasswordInput
            description='Must be at least 6 characters long.'
            icon={<IconFingerprint size={16} />}
            id='currentPassword'
            label='Password'
            placeholder='Your current password'
            required
            {...register('currentPassword')}
            error={errors?.currentPassword?.message}
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
