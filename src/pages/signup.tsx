import { Anchor, Container, Text, Title } from '@mantine/core';
import Link from 'next/link';

import { withRegisterPage } from '~clientUtils/authHooks';
import { SignupForm } from '~components/auth/SignupForm';

const SignUp = () => (
  <>
    <Container mt='6vh' size='xl'>
      <Title align='center' weight={900}>
        Welcome to SnapSave
      </Title>
      <Text align='center' color='dimmed' mt={5} size='sm'>
        Already have an account?
        <Link href='/signin' passHref>
          <Anchor component='a' ml={5}>
            Sign in
          </Anchor>
        </Link>
      </Text>
      <SignupForm />
    </Container>
  </>
);

export default withRegisterPage(SignUp);
