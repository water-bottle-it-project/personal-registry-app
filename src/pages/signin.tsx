import { Anchor, Container, Text, Title } from '@mantine/core';
import Link from 'next/link';

import { withLoginPage } from '~clientUtils/authHooks';
import { SigninForm } from '~components/auth/SigninForm';

function SignIn() {
  return (
    <>
      <Container mt='6vh' size='xl'>
        <Title align='center' weight={900}>
          Sign in
        </Title>
        <Text align='center' color='dimmed' mt={5} size='sm'>
          Don't have an account yet?
          <Link href='/signup' passHref>
            <Anchor component='a' ml={5}>
              Sign up
            </Anchor>
          </Link>
        </Text>
        <SigninForm />
      </Container>
    </>
  );
}

export default withLoginPage(SignIn);
