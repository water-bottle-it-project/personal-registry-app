import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

export function showFailureNotification(message: string) {
  showNotification({
    icon: <IconX />,
    title: 'Failure!',
    color: 'red',
    message,
  });
}

export function showSuccessNotification(message: string) {
  showNotification({
    icon: <IconCheck />,
    title: 'Success!',
    message,
  });
}
