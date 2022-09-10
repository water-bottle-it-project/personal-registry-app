import { useRouter } from 'next/router';

import { withAuthedPage } from '~clientUtils/authHooks';
import { trpcClient } from '~clientUtils/trpcClient';

function Memory() {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== 'string') {
    return null;
  }
  const { data, isLoadingError, isLoading, error } = trpcClient.useQuery([
    'memory.GetMemory',
    { _id: id },
  ]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isLoadingError) {
    return <div>Error loading memory: {error?.message}</div>;
  }
  const { title, description, firstDate, lastDate, photos, collections } = data?.memory || {};
  collections && console.log(collections);
  return (
    <>
      <h1>{title}</h1>
      <p>Description: {description}</p>
      <p>Collections:</p>
      {collections && collections.map(c => <div>{c.collectionId}</div>)}

      <p>Start Date: {firstDate && firstDate.toString()}</p>
      <p>End Date: {lastDate && lastDate.toString()}</p>
      <p>Photos:</p>
      {photos && photos.map(c => <div>{c.photoId}</div>)}
    </>
  );
}

export default withAuthedPage(Memory);
