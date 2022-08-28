import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ButtonProps } from '@mantine/core';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { IconArrowNarrowRight, IconCheck } from '@tabler/icons';
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
      <Container my={40} size={420}>
        <Paper mt={30} p={30} radius='md' shadow='md' withBorder>
          <TextInput
            error={errors?.email?.message}
            id='email'
            label='Email'
            placeholder='user@example.com'
            required
            type='email'
            {...register('email')}
          />
          <PasswordInput
            id='password'
            label='Password'
            mt='md'
            placeholder='Your password'
            required
            {...register('password')}
            error={errors?.password?.message}
          />
          <Group mt='md' position='apart'>
            <Checkbox label='Remember me' />
            <Anchor<'a'> href='#' onClick={event => event.preventDefault()} size='sm'>
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt='xl' type='submit' {...loginButtonProps}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
