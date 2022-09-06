import { withAuthedPage } from '~clientUtils/authHooks';
import { CollectionCreateModal } from '~components/collection/CollectionCreateModal';

function CollectionCreatePage() {
  return (
    <>
      <CollectionCreateModal />
    </>
  );
}

export default withAuthedPage(CollectionCreatePage);
