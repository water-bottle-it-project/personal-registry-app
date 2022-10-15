import { Box, Card, Container, Grid, Group, Skeleton, Space } from '@mantine/core';

export function MemorySkeleton() {
  return (
    <>
      <Box
        sx={theme => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
          paddingTop: theme.spacing.xl,
          paddingBottom: theme.spacing.xl,
        })}
      >
        <Container size='xl'>
          <Group position='apart'>
            <Skeleton height={40} mt={6} width='30%' />
            <Skeleton height={40} mt={6} width='10%' />
          </Group>
          <Group position='apart'>
            <Skeleton height={20} mt={6} width='15%' />
            <Skeleton height={20} mt={6} width='15%' />
          </Group>
          <Group position='apart'>
            <Skeleton height={15} mt={6} width='20%' />
            <Skeleton height={15} mt={6} width='20%' />
          </Group>
          <Space h='xs' />
          <Skeleton height={20} mt={6} width='15%' />
          <Skeleton height={18} mt={6} width='40%' />
          <Space h='xs' />
          <Skeleton height={20} mt={6} width='15%' />
          <Skeleton height={15} mt={6} width='50%' />
          <Skeleton height={15} mt={6} width='50%' />
          <Skeleton height={15} mt={6} width='50%' />
          <Space h='md' />
        </Container>
      </Box>
      <Container size='xl'>
        <Space h='xl' />
        {Array.from({ length: 2 }, (_, i) => (
          <Grid justify='center' key={i}>
            <Grid.Col lg={8} md={8}>
              <Card>
                <Card.Section>
                  <Skeleton height={500} width='100%' />
                </Card.Section>
              </Card>
              <Space h='md' />
            </Grid.Col>
            <Grid.Col lg={4} md={8}>
              <Skeleton height={500} width='100%' />
            </Grid.Col>
          </Grid>
        ))}
      </Container>
    </>
  );
}
