import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

interface AlertProps {
  title: string;
  text: string;
  isError: boolean;
}

export function AlertMessage({ text, title, isError }: AlertProps) {
  return (
    <Alert color={isError ? 'red' : 'green'} icon={<IconAlertCircle size={16} />} title={title}>
      {text}
    </Alert>
  );
}
