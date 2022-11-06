import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ButtonProps } from '@mantine/core';
import { Button, Container, Paper, TextInput } from '@mantine/core';
import { IconArrowNarrowRight, IconAt, IconCheck } from '@tabler/icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { emailZ } from '~types/util/emailT';

const forgotZ = z
  .object({
    email: emailZ,
  })
  .required();

type ForgotT = z.infer<typeof forgotZ>;

export function ForgotPasswordForm() {
  // Observe form state
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValidating, isSubmitting, isSubmitSuccessful },
  } = useForm<ForgotT>({
    resolver: zodResolver(forgotZ),
  });

  function handleForgotPassword({ email }: { email: string }) {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email).catch(error => {
      if (error.code === 'auth/user-not-found') {
        setError('email', { type: 'server', message: 'User not found!' }, { shouldFocus: true });
      } else {
        setError(
          'email',
          { type: 'server', message: 'Something went wrong!' },
          { shouldFocus: true },
        );
      }
    });
  }

  // Submit button status indicator
  let sendButtonProps: Partial<ButtonProps> = { rightIcon: <IconArrowNarrowRight /> };
  if (isValidating || isSubmitting) {
    sendButtonProps = { loading: true, loaderPosition: 'right' };
  } else if (isSubmitSuccessful) {
    sendButtonProps = { rightIcon: <IconCheck /> };
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleForgotPassword)}>
        <Container my={10} size={420}>
          <Paper mt={20} p={30} radius='md' shadow='md' withBorder>
            <TextInput
              error={errors?.email?.message}
              icon={<IconAt size={16} />}
              id='email'
              label='Email'
              placeholder='user@example.com'
              required
              type='email'
              {...register('email')}
            />
            <Button fullWidth mt='xl' type='submit' {...sendButtonProps}>
              Send verification email
            </Button>
          </Paper>
        </Container>
      </form>
    </>
  );
}
