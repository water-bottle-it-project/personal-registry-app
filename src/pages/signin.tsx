import { Container, Title } from '@mantine/core';

import { withLoginPage } from '~clientUtils/authHooks';
import { SigninForm } from '~components/signin/SigninForm';

function SignIn() {
  return (
    <>
      <Container size='xl'>
        <Title>Sign in</Title>
        <SigninForm />
      </Container>
    </>
  );
}

export default withLoginPage(SignIn);
