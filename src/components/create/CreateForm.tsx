import { Space, Stack } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';

import { CreateFormMemoryInfo } from '~components/create/CreateFormMemoryInfo';
import { CreateFormTop } from '~components/create/CreateFormTop';

export function CreateForm() {
  const formMethods = useForm();
  return (
    <>
      <FormProvider {...formMethods}>
        <form>
          <Stack spacing='sm'>
            <CreateFormTop />
            <CreateFormMemoryInfo />
          </Stack>
        </form>
      </FormProvider>
    </>
  );
}
