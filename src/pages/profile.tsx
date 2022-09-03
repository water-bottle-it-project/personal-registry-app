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
