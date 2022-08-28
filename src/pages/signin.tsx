import { Container, Text, Title } from '@mantine/core';
import Link from 'next/link';

import { withLoginPage } from '~clientUtils/authHooks';
import { SigninForm } from '~components/auth/SigninForm';

function SignIn() {
  return (
    <>
      <Container mt={100} size='xl'>
        <Title
          align='center'
          sx={theme => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Sign In
        </Title>
        <Text align='center' color='dimmed' mt={5} size='sm'>
          Do not have an account yet? <Link href='/signup'>Create account</Link>
        </Text>
        <SigninForm />
      </Container>
    </>
  );
}

export default withLoginPage(SignIn);
