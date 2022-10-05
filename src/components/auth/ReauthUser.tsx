import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth';

import { User } from '~server/models/user';

export function reauthUser(credentialPass: string) {
  const auth = getAuth();
  const user = auth.currentUser!;

  // TODO(you): prompt the user to re-provide their sign-in credentials
  const credential = EmailAuthProvider.credential(user?.email || '', credentialPass);

  reauthenticateWithCredential(user, credential)
    .then(() => {
      // User re-authenticated.
    })
    .catch(error => {
      // An error ocurred
      // ...
    });
}
