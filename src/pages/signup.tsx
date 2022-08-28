import { Container, Text, Title } from '@mantine/core';
import Link from 'next/link';

import { withRegisterPage } from '~clientUtils/authHooks';
import { SignupForm } from '~components/auth/SignupForm';

function SignUp() {
  return (
    <>
      <Container mt={100} size='xl'>
        <Title
          align='center'
          sx={theme => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome to Registry App
        </Title>
        <Text align='center' color='dimmed' mt={5} size='sm'>
          Already have an account? <Link href='/signin'>Login</Link>
        </Text>
        <SignupForm />
      </Container>
    </>
  );
}

export default withRegisterPage(SignUp);
