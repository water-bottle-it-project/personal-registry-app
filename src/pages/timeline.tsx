import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { AllMemoriesIndex } from '~components/allMemories/AllMemoriesIndex';

function AllMemories() {
  return (
    <>
      <NextSeo description='My memories' title='Memories' />
      <AllMemoriesIndex />
    </>
  );
}

export default withAuthedPage(AllMemories);
