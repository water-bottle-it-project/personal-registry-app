import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, Space, Stack } from '@mantine/core';
import { IconFingerprint } from '@tabler/icons';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useAuthUser } from 'next-firebase-auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  showFailureNotification,
  showSuccessNotification,
} from '~components/util/notificationHelpers';

const passwordUpdateZ = z.object({
  originalPassword: z.string().min(1),
  newPassword: z.string().min(6),
  confirmNewPassword: z.string().min(6),
});

type passwordUpdateT = z.infer<typeof passwordUpdateZ>;

export function PasswordUpdateForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<passwordUpdateT>({
    resolver: zodResolver(passwordUpdateZ),
  });

  const user = useAuthUser();

  const handlePasswordUpdate = async ({
    originalPassword,
    newPassword,
    confirmNewPassword,
  }: passwordUpdateT) => {
    const { id, email, firebaseUser } = user;
    if (!id || !email || !firebaseUser) {
      showFailureNotification('Not authenticated.');
      return;
    }

    // passwords don't match
    if (confirmNewPassword !== newPassword) {
      setError(
        'confirmNewPassword',
        { type: 'user', message: "Passwords don't match." },
        { shouldFocus: true },
      );
      return;
    }

    const credential = EmailAuthProvider.credential(email, originalPassword);

    // attempt re-auth, catch wrong password error
    await reauthenticateWithCredential(firebaseUser, credential)
      .then(() => {
        // User re-authenticated, have a crack at updating password
        updatePassword(firebaseUser, newPassword)
          .then(() => {
            //  able to update pass
            showSuccessNotification('Password was updated successfully');
            reset();
          })
          .catch(error => {
            // not able to update password
            showFailureNotification('Unable to update password: ' + error);
          });
      })
      .catch(error => {
        setError(
          'originalPassword',
          { type: 'server', message: error.message },
          { shouldFocus: true },
        );
      });
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handlePasswordUpdate)}>
        <Stack>
          <PasswordInput
            description={"You'll need this."}
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
            description='Must be identical.'
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
        <Button loaderPosition='right' loading={isSubmitting} ml={10} type='submit'>
          Submit
        </Button>
      </form>
    </>
  );
}
