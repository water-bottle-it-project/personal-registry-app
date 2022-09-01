import type { NextPage } from 'next';
import { useAuthUser } from 'next-firebase-auth';

import { withAuthedPage } from '~clientUtils/authHooks';
import { ProfileContainer } from '~components/profile/ProfileContainer';

function Profile() {
  return (
    <>
      <ProfileContainer />
    </>
  );
}

export default withAuthedPage(Profile);
