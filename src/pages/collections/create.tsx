import { Container, Text } from '@mantine/core';
import { useRouter } from 'next/router';

import { withAuthedPage } from '~clientUtils/authHooks';
import { CollectionEditModal } from '~components/collection/CollectionEditModal';

function CollectionCreatePage() {
  const router = useRouter();

  return <></>;
}

export default withAuthedPage(CollectionCreatePage);
