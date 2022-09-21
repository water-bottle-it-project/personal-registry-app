import { NextSeo } from 'next-seo';

import { withAuthedPage } from '~clientUtils/authHooks';
import { ProfileContainer } from '~components/profile/ProfileContainer';

function Profile() {
  return (
    <>
      <NextSeo description='My profile' title='Profile' />
      <ProfileContainer />
    </>
  );
}

export default withAuthedPage(Profile);
