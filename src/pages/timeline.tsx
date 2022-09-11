import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { TimelineGrid } from '~components/timeline/TimelineGrid';
import { Container } from '@mantine/core';

function Timeline() {
  return (
    <>
      <NextSeo description='My timeline of memories' title='Timeline' />
      <Container size='xl'>
        <TimelineGrid />
      </Container>
    </>
  );
}

export default withAuthedPage(Timeline);
