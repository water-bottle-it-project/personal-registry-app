import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ButtonProps } from '@mantine/core';
import { Button, Container, Paper, PasswordInput, TextInput } from '@mantine/core';
import { IconArrowNarrowRight, IconAt, IconCheck, IconFingerprint } from '@tabler/icons';
import { useForm } from 'react-hook-form';

import type { SignupT } from '~types/signup';
import { signupZ } from '~types/signup';

export function SignupForm() {
  // Observe form state
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValidating, isSubmitting, isSubmitSuccessful },
  } = useForm<SignupT>({
    resolver: zodResolver(signupZ),
  });

  function handleSignup({ email, password, repeatPassword }: SignupT) {
    if (password !== repeatPassword) {
      setError(
        'repeatPassword',
        { type: 'user', message: "Passwords don't match." },
        { shouldFocus: true },
      );
      return;
    }
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password).catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        setError('email', { type: 'server', message: error.message }, { shouldFocus: true });
      } else {
        setError('password', { type: 'server', message: error.message }, { shouldFocus: true });
      }
    });
  }

  // Submit button status indicator
  let signupButtonProps: Partial<ButtonProps> = { rightIcon: <IconArrowNarrowRight /> };
  if (isValidating || isSubmitting) {
    signupButtonProps = { loading: true, loaderPosition: 'right' };
  } else if (isSubmitSuccessful) {
    signupButtonProps = { rightIcon: <IconCheck /> };
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleSignup)}>
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
          <PasswordInput
            description='Must be at least 6 characters long.'
            icon={<IconFingerprint size={16} />}
            id='password'
            label='Password'
            mt='md'
            placeholder='Your password'
            required
            {...register('password')}
            error={errors?.password?.message}
          />
          <PasswordInput
            icon={<IconFingerprint size={16} />}
            id='repeatPassword'
            label='Repeat Password'
            mt='md'
            placeholder='Repeat your password'
            required
            {...register('repeatPassword')}
            error={errors?.repeatPassword?.message}
          />
          <Button fullWidth mt='xl' type='submit' {...signupButtonProps}>
            Sign up
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
