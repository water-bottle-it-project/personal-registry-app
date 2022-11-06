import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

export function showFailureNotification(message: string, id?: string) {
  showNotification({
    icon: <IconX />,
    title: 'Failure!',
    color: 'red',
    id,
    message,
  });
}

export function showSuccessNotification(message: string, id?: string) {
  showNotification({
    icon: <IconCheck />,
    title: 'Success!',
    id,
    message,
  });
}
