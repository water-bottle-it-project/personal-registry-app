import {
  Accordion,
  Anchor,
  BackgroundImage,
  Container,
  createStyles,
  Space,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons';

import gradient from '~components/homepage/gradient.png';
import gradientDark from '~components/homepage/gradient-dark.png';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('control');

  return {
    wrapper: {
      paddingTop: theme.spacing.xl * 2,
      minHeight: 600,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top left',
      position: 'relative',
    },

    title: {
      fontSize: 52,
      marginBottom: theme.spacing.xl * 1.5,
      // Setting a CSS-in-JS style to undefined reverts it to the default.
      color: theme.colorScheme === 'dark' ? undefined : theme.white,
    },

    item: {
      borderBottom: 0,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg,
      overflow: 'hidden',
    },

    control: {
      fontSize: theme.fontSizes.lg,
      padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },

    content: {
      paddingLeft: theme.spacing.xl,
      lineHeight: 1.6,
    },

    icon: {
      ref: icon,
      marginLeft: theme.spacing.md,
    },

    gradient: {
      backgroundImage: `radial-gradient(${theme.colors[theme.primaryColor][6]} 0%, ${
        theme.colors[theme.primaryColor][5]
      } 100%)`,
    },

    button: {
      display: 'block',
      marginTop: theme.spacing.md,

      '@media (max-width: 755px)': {
        display: 'block',
        width: '100%',
      },
    },
  };
});

const info = [
  {
    title: 'Why does this web app exist?',
    answer: 'This is our capstone project for COMP30022 IT Project Semester 2 2022',
  },
  {
    title: 'What tech stack do you use?',
    answer: (
      <Text>
        There's a lot of things to unpack here.{' '}
        <Anchor
          href='https://water-bottle.atlassian.net/wiki/spaces/DEV/pages/229829/Tech+Stack+Architecture'
          target='_blank'
        >
          Visit our Confluence space for all of the details!
        </Anchor>
      </Text>
    ),
  },
  {
    title: 'Do I need to pay to use this service?',
    answer: 'It is free to use our service until you post more than 69 images. Haha.',
  },
  {
    title: 'What is love?',
    answer: `Baby don't hurt me`,
  },
];

export function FAQ() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <BackgroundImage src={theme.colorScheme === 'dark' ? gradientDark.src : gradient.src}>
      <div className={classes.wrapper}>
        <Container size='sm'>
          <Title align='center' className={classes.title}>
            Frequently Asked Questions
          </Title>

          <Accordion
            chevron={
              <ThemeIcon className={classes.gradient} radius='xl' size={32}>
                <IconPlus size={18} stroke={1.5} />
              </ThemeIcon>
            }
            chevronPosition='right'
            chevronSize={50}
            defaultValue={info[0].title}
            styles={{
              chevron: {
                '&[data-rotate]': {
                  transform: 'rotate(45deg)',
                },
              },
            }}
            variant='separated'
          >
            {info.map(a => (
              <Accordion.Item className={classes.item} key={a.title} value={a.title}>
                <Accordion.Control>
                  <Title order={4}>{a.title}</Title>
                </Accordion.Control>
                <Accordion.Panel>{a.answer}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />
      </div>
    </BackgroundImage>
  );
}
