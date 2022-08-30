import { Grid, Stack, Textarea, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { IconCalendar, IconPencil } from '@tabler/icons';

export function CreateFormMemoryInfo() {
  return (
    <Grid grow>
      <Grid.Col sm={6}>
        <Stack spacing='sm' sx={{ height: '100%' }}>
          <TextInput
            description='Craft a descriptive title for your new memory.'
            icon={<IconPencil size={16} />}
            label='Title'
            placeholder='My memory title'
            required
          />
          <DateRangePicker
            allowSingleDateInRange
            description='Click a date to set it as either the start or end date.
            Click again to set the other date.'
            dropdownPosition='bottom-start'
            firstDayOfWeek='sunday'
            icon={<IconCalendar size={16} />}
            inputFormat='D MMMM YYYY'
            label='Start and end dates'
            placeholder='Click to choose'
            withAsterisk
          />
        </Stack>
      </Grid.Col>
      <Grid.Col sm={6}>
        <Stack spacing='sm' sx={{ height: '100%' }}>
          <Textarea
            description='As brief as a fleeting moment, or the start of a new best-selling novel.'
            label='Description'
            maxLength={1000}
            styles={{
              root: { height: '100%', display: 'flex', flexDirection: 'column', marginTop: 2 },
              wrapper: { display: 'flex', flexGrow: 1 },
              input: { flexGrow: 1 },
            }}
          />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
