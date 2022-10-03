import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, Space, Stack, TextInput } from '@mantine/core';
import { IconFingerprint } from '@tabler/icons';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { useAuthUser } from 'next-firebase-auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  showFailureNotification,
  showSuccessNotification,
} from '~components/util/notificationHelpers';

const emailUpdateZ = z.object({
  currentPassword: z.string().min(1),
  newEmail: z.string().email().trim().min(1),
});

type emailUpdateT = z.infer<typeof emailUpdateZ>;

export function EmailUpdateForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<emailUpdateT>({
    resolver: zodResolver(emailUpdateZ),
  });

  const user = useAuthUser();

  const handleEmailUpdate = async ({ currentPassword, newEmail }: emailUpdateT) => {
    // first need to re-auth the user
    const { id, email, firebaseUser } = user;
    if (!id || !email || !firebaseUser) {
      showFailureNotification('Not authenticated.');
      return;
    }

    const credential = EmailAuthProvider.credential(email, currentPassword);

    // attempt re-auth, catch wrong password error
    await reauthenticateWithCredential(firebaseUser, credential)
      .then(() => {
        // User re-authenticated, have a crack at updating email
        updateEmail(firebaseUser, newEmail)
          .then(() => {
            //  able to update email
            showSuccessNotification('Email was updated successfully');
            reset();
          })
          .catch(error => {
            // not able to update email
            if (error.code === 'auth/email-already-in-use') {
              showFailureNotification('Unable to update email: email is already in use');
            } else {
              showFailureNotification('Unable to update email: ' + error);
            }
          });
      })
      .catch(error => {
        // An error occurred
        // ...
        setError(
          'currentPassword',
          { type: 'server', message: error.message },
          { shouldFocus: true },
        );
      });
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleEmailUpdate)}>
        <Stack>
          <TextInput
            description='Must be a valid email.'
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
            label='Current Password'
            placeholder='Your current password'
            required
            {...register('currentPassword')}
            error={errors?.currentPassword?.message}
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
