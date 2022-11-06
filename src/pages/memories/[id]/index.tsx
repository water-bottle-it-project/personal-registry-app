import { useRouter } from 'next/router';

import { withAuthedPage } from '~clientUtils/authHooks';
import { MemoryIndex } from '~components/memory/MemoryIndex';

function Memory() {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== 'string') {
    return null;
  }

  return (
    <>
      <MemoryIndex _id={id} />
    </>
  );
}

export default withAuthedPage(Memory);
