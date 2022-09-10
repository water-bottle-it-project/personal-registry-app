import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Select,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { IconDownload } from '@tabler/icons';

export function MemoryHeader() {
  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        padding: theme.spacing.xl,
      })}
    >
      <Container size='xl'>
        <Group>
          <Title order={1}>Memory Name</Title>
          <Button variant='outline'>Edit</Button>
        </Group>
        <Space h='md' />
        <Title order={4}>Memory creation date</Title>
        <Text>1 August 2022</Text>
        <Space h='sm' />
        <Title order={4}>Memory range</Title>
        <Text>1 July 2022 to 1 August 2022</Text>
        <Space h='xl' />
        <Title order={4}>Collections</Title>
        <Space h='sm' />
        <Group>
          <Badge radius='xs'>Gadgets</Badge>
          <Badge radius='xs'>Gadgets</Badge>
          <Badge radius='xs'>Gadgets</Badge>
          <Badge radius='xs'>Gadgets</Badge>
          <Badge radius='xs'>Gadgets</Badge>
        </Group>
        <Space h='xl' />
        <Group position='apart'>
          <Group>
            <Title order={4}>Sort by</Title>
            <Select
              placeholder='Default'
              data={[
                { value: 'newToOld', label: 'Newest to Oldest' },
                { value: 'oldToNew', label: 'Oldest to Newest' },
              ]}
            />
          </Group>
          <div>
            <Button leftIcon={<IconDownload />} variant='outline'>
              Download
            </Button>
          </div>
        </Group>
      </Container>
    </Box>
  );
}
