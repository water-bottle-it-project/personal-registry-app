import { Container, Space } from '@mantine/core';
import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { CreateForm } from '~components/create/CreateForm';

const Create = () => (
  <>
    <NextSeo description='Create a memory in my personal registry' title='Create memory' />
    <Container size='xl'>
      <Space h='xl' />
      <CreateForm />
    </Container>
  </>
);

export default withAuthedPage(Create);
