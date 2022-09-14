import { Container, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';

import { withAuthedPage } from '~clientUtils/authHooks';
import { EditForm } from '~components/edit/EditForm';

function EditError() {
  return (
    <Container size='xl'>
      <Title>Edit collection</Title>
      <Text>Error loading memory to edit: memory does not exist.</Text>
    </Container>
  );
}

function Edit() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <EditError />;
  }

  return (
    <Container size='xl'>
      <EditForm _id={id} />
    </Container>
  );
}

export default withAuthedPage(Edit);
