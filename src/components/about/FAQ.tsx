import {
  Accordion,
  BackgroundImage,
  Container,
  createStyles,
  MantineProvider,
  Space,
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
      color: theme.black,
    },

    title: {
      color: theme.white,
      fontSize: 52,
      marginBottom: theme.spacing.xl * 1.5,
    },

    item: {
      backgroundColor: theme.white,
      borderBottom: 0,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg,
      overflow: 'hidden',
    },

    control: {
      fontSize: theme.fontSizes.lg,
      padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
      color: theme.black,

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },

    content: {
      paddingLeft: theme.spacing.xl,
      lineHeight: 1.6,
      color: theme.black,
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

const ans1 = 'This is our capstone project for COMP30022 IT Project Semester 2 2022';
const ans2 = 'Mongo with Firebase Auth, React/NextJS, MantineUI, and NodeJS';
const ans3 = 'It is free to use our service until you post more than 69 images';
const ans4 = "Baby don't hurt me";

export function FAQ() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <MantineProvider inherit theme={{ colorScheme: 'light' }}>
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
              defaultValue='reset-password'
              styles={{
                chevron: {
                  '&[data-rotate]': {
                    transform: 'rotate(45deg)',
                  },
                },
              }}
              variant='separated'
            >
              <Accordion.Item className={classes.item} value='reset-password'>
                <Accordion.Control>
                  <Title order={4}>Why does this web app exist?</Title>
                </Accordion.Control>
                <Accordion.Panel>{ans1}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value='another-account'>
                <Accordion.Control>
                  <Title order={4}>What tech stack do you use?</Title>
                </Accordion.Control>
                <Accordion.Panel>{ans2}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value='newsletter'>
                <Accordion.Control>
                  <Title order={4}>Do I need to pay to use this service?</Title>
                </Accordion.Control>
                <Accordion.Panel>{ans3}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value='credit-card'>
                <Accordion.Control>
                  <Title order={4}>What is love?</Title>
                </Accordion.Control>
                <Accordion.Panel>{ans4}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Container>
          <Space h='xl' />
          <Space h='xl' />
          <Space h='xl' />
        </div>
      </BackgroundImage>
    </MantineProvider>
  );
}
