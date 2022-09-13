import { Container, Text, Title } from '@mantine/core';

import { withLoginPage } from '~clientUtils/authHooks';
import { ForgotPasswordForm } from '~components/auth/ForgotPasswordForm';

const ForgotPassword = () => (
  <>
    <Container mt='6vh' size='xl'>
      <Title align='center' weight={900}>
        Forgot Password
      </Title>
      <Text align='center' color='dimmed' mt={5} size='sm'>
        Enter your email and we'll send you a link to get back into your account.
      </Text>
      <ForgotPasswordForm />
    </Container>
  </>
);

export default withLoginPage(ForgotPassword);
