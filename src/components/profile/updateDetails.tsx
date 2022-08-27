import type { PasswordInputProps } from '@mantine/core';
import { Anchor, Button, createStyles, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons';

export function ConfirmPassword() {
  return (
    <PasswordInput
      description='Passwords must be identical'
      label=' Confirm New Password'
      placeholder='New Password (Again)'
      withAsterisk
    />
  );
}

export function InputValidation() {
  return <TextInput defaultValue='user@domain.com' label='Input New Email:' />;
}

export function UpdatePassword() {
  return (
    <PasswordInput
      description='Passwords must be identical'
      label=' New Password'
      placeholder='New Password'
      withAsterisk
    />
  );
}
