import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ButtonProps } from '@mantine/core';
import { Button, PasswordInput, Space, TextInput } from '@mantine/core';
import { IconArrowNarrowRight, IconAt, IconCheck, IconFingerprint } from '@tabler/icons';
import { useForm } from 'react-hook-form';

import type { SigninT } from '~types/signin';
import { signinZ } from '~types/signin';

export function SigninForm() {
  // Observe form state
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValidating, isSubmitting, isSubmitSuccessful },
  } = useForm<SigninT>({
    resolver: zodResolver(signinZ),
  });

  function handleSignin({ email, password }: SigninT) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password).catch(error => {
      if (error.code === 'auth/wrong-password') {
        setError('password', { type: 'server', message: error.message }, { shouldFocus: true });
      } else {
        setError('email', { type: 'server', message: error.message }, { shouldFocus: true });
      }
    });
  }

  // Submit button status indicator
  let loginButtonProps: Partial<ButtonProps> = { rightIcon: <IconArrowNarrowRight /> };
  if (isValidating || isSubmitting) {
    loginButtonProps = { loading: true, loaderPosition: 'right' };
  } else if (isSubmitSuccessful) {
    loginButtonProps = { rightIcon: <IconCheck /> };
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleSignin)}>
      <TextInput
        error={errors?.email?.message}
        icon={<IconAt size={16} />}
        id='email'
        label='Email address'
        placeholder='user@example.com'
        required
        type='email'
        {...register('email')}
      />
      <Space h='xs' />
      <PasswordInput
        error={errors?.password?.message}
        icon={<IconFingerprint size={16} />}
        id='password'
        label='Password'
        placeholder='super-secret-password'
        required
        {...register('password')}
      />
      <Space h='md' />
      <Button type='submit' {...loginButtonProps}>
        Log in
      </Button>
    </form>
  );
}
