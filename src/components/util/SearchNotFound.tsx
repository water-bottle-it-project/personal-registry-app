import { Stack, Text, Title, useMantineTheme } from '@mantine/core';
import Lottie from 'lottie-react';

import notFoundLottie from '~components/util/search-failed-lottie.json';
import notFoundLottieDark from '~components/util/search-failed-lottie-dark.json';

interface SearchNotFoundProps {
  text: string;
  type: string;
}

export function SearchNotFound({ text, type }: SearchNotFoundProps) {
  const theme = useMantineTheme();
  return (
    <Stack align='center'>
      <Lottie
        animationData={theme.colorScheme === 'dark' ? notFoundLottieDark : notFoundLottie}
        loop
        style={{ maxWidth: '300px', maxHeight: '300px' }}
      />
      <Title order={2}>Bummer!</Title>
      <Text>
        No {type}s named {text} found.
      </Text>
    </Stack>
  );
}
