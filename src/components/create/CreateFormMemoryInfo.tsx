import { Grid, MultiSelect, Stack, Textarea, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { IconCalendar, IconPencil, IconTags } from '@tabler/icons';
import type { UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { useTextareaStyles } from '~components/create/textareaStyles';
import type { collectionSelectItemT } from '~types/collection/collection';
import type { memoryCreateFormT } from '~types/memory/memoryForm';

interface CreateFormMemoryInfoProps extends UseFormReturn<memoryCreateFormT> {
  collections: collectionSelectItemT[];
}

export function CreateFormMemoryInfo({
  register,
  control,
  formState: { errors },
  collections,
}: CreateFormMemoryInfoProps) {
  const { classes } = useTextareaStyles();

  return (
    <Grid grow>
      <Grid.Col sm={6}>
        <Stack spacing='sm' sx={{ height: '100%' }}>
          <TextInput
            description='Craft a descriptive title for your new memory.'
            error={errors?.title?.message}
            icon={<IconPencil size={16} />}
            label='Title'
            placeholder='My memory title'
            required
            {...register('title')}
          />

          <Controller
            control={control}
            name='date'
            render={({ field: { value, onChange, ref, ...field }, fieldState: { error } }) => (
              <DateRangePicker
                allowSingleDateInRange
                description='Click a date to set it as either the start or end date.
            Click again to set the other date. The dates can be the same.'
                dropdownPosition='bottom-start'
                error={error && 'Start and end dates are required.'}
                firstDayOfWeek='sunday'
                icon={<IconCalendar size={16} />}
                inputFormat='D MMMM YYYY'
                label='Start and end dates'
                onChange={onChange}
                placeholder='Click to choose a date range'
                ref={ref}
                value={value}
                withAsterisk
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name='collections'
            render={({ field: { value, onChange, ref, ...field } }) => (
              <MultiSelect
                clearable
                data={collections}
                description='Choose collections that this memory should be a part of.'
                icon={<IconTags size={16} />}
                label='Collections'
                maxDropdownHeight={250}
                onChange={onChange}
                placeholder='Click to select collections'
                searchable
                transitionDuration={250}
                value={value}
              />
            )}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col sm={6}>
        <Stack spacing='sm' sx={{ height: '100%' }}>
          <Textarea
            classNames={classes}
            description='As brief as a fleeting moment, or the start of a new best-selling novel.'
            label='Description'
            maxLength={10000}
            minRows={4}
            placeholder={`You can write over 1000 words in here...but you don't have to!`}
            {...register('description')}
          />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
