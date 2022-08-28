import { Container, createStyles, Overlay, Text, Title } from '@mantine/core';

interface BannerProps {
  title: string;
  description: string;
}

export function Banner(props: BannerProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color='#000' opacity={0.65} zIndex={1} />
      <div className={classes.inner}>
        <Title className={classes.title}>{props.title}</Title>
        <Container size={640}>
          <Text className={classes.description} size='lg'>
            {props.description}
          </Text>
        </Container>
      </div>
    </div>
  );
}

const useStyles = createStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingTop: 180,
    paddingBottom: 130,
    backgroundImage:
      'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (max-width: 520px)': {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },
}));
