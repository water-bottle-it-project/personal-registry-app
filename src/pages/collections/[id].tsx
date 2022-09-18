import { useRouter } from 'next/router';

import { withAuthedPage } from '~clientUtils/authHooks';
import { CollectionMemories } from '~components/collection/CollectionMemories';

function CollectionMemoryPage() {
  const router = useRouter();
  const id = router.asPath.split('/')[2];

  return (
    <>
      <CollectionMemories _id={id} />
    </>
  );
}

export default withAuthedPage(CollectionMemoryPage);
