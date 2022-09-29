import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';

function successNotif(dispMessage: string) {
  showNotification({
    autoClose: 8000,
    icon: <IconCheck />,
    title: 'Success!',
    color: 'teal',
    message: dispMessage,
  });
}

function failureNotif(dispMessage: string) {
  showNotification({
    autoClose: 8000,
    icon: <IconCheck />,
    title: 'Failure!',
    color: 'red',
    message: dispMessage,
  });
}

export function changeEmail(newEmail: string) {
  const auth = getAuth();

  const user = auth && auth?.currentUser;

  updateEmail(user!, newEmail)
    .then(() => {
      //  able to update email
      successNotif('Email was updated successfully');
    })
    .catch(error => {
      // not able to update email
      if (error.code === 'auth/email-already-in-use') {
        failureNotif('Unable to update email: email is already in use');
      } else {
        failureNotif('Unable to update email: ' + error);
      }
    });
}

export function changePassword(newPass: string) {
  const auth = getAuth();

  const user = auth && auth?.currentUser;

  updatePassword(user!, newPass)
    .then(() => {
      //  able to update pass
      successNotif('Password was updated successfully');
    })
    .catch(error => {
      // not able to update password
      failureNotif('Unable to update password: ' + error);
    });
}

export {};
