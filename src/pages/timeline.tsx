import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { TimelineIndex } from '~components/timeline/TimelineIndex';

function Timeline() {
  return (
    <>
      <NextSeo description='My memories' title='Memories' />
      <TimelineIndex />
    </>
  );
}

export default withAuthedPage(Timeline);
