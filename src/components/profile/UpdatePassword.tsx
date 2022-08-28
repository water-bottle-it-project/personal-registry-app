import { PasswordInput } from '@mantine/core';

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
