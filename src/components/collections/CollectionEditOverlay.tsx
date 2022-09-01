import {
  Button,
  ColorPicker,
  Container,
  createStyles,
  Image,
  SimpleGrid,
  Space,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface EditCollectionProps {
  title: string;
  description: string;
  userId: string;
  color: string;
}

export function CollectionEditOverlay({ title, description, userId, color }: EditCollectionProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [value, onChange] = useState(null);
  return (
    <Container
      sx={theme => ({
        fontSize: theme.fontSizes.sm,
        padding: '0',
      })}
    >
      <Title order={1}>Edit Collection</Title>
      <Space h='md' />
      <form action=''>
        <TextInput
          id='name'
          label='Collection Name'
          placeholder='Enter a collection name'
          value={title}
        />
        <Space h='xs' />
        <Textarea label='Description' placeholder='Your comment' value={description} />
        <Space h='xl' />
        <Title order={1}>Customize color</Title>
        <Space h='md' />
        <TextInput disabled hidden id='color' label='Select a color' value={value || color} />
        <ColorPicker
          focusable
          format='hex'
          fullWidth
          onChange={onChange}
          swatches={[
            theme.colors.blue[2],
            theme.colors.violet[2],
            theme.colors.indigo[2],
            theme.colors.cyan[2],
            theme.colors.teal[2],
            theme.colors.green[2],
            theme.colors.lime[2],
            theme.colors.yellow[2],
            theme.colors.orange[2],
            theme.colors.pink[2],
            theme.colors.red[2],
            theme.colors.gray[2],
          ]}
          value={value}
          withPicker={false}
        />
        <Space h='xs' />
        <div className={classes.colorGrid}>
          <div className={classes.colorContainer}>
            <Text>Selected Color</Text>
            <div className={classes.color} style={{ backgroundColor: value }} />
          </div>

          <div className={classes.colorContainer}>
            <Text>Current Color</Text>
            <div className={classes.color} style={{ backgroundColor: theme.colors[color][2] }} />
          </div>
        </div>

        <Space h='xl' />
        <Button mt='xl'>Save</Button>
      </form>
    </Container>
  );
}

const useStyles = createStyles(theme => ({
  colorGrid: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  colorContainer: {
    display: 'column',
  },
  color: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
}));
