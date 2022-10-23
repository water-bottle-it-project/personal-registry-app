import { Affix, Button, createStyles, Group, Text, Transition } from '@mantine/core';
import type { DropzoneProps } from '@mantine/dropzone';
import { Dropzone } from '@mantine/dropzone';
import { useWindowScroll } from '@mantine/hooks';
import { IconCloudUpload, IconDownload, IconPhoto, IconX } from '@tabler/icons';
import { useRef } from 'react';

const useStyles = createStyles(theme => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}));

type CreateFormDropzoneProps = Pick<DropzoneProps, 'onDrop'>;

export function CreateFormDropzone({ onDrop }: CreateFormDropzoneProps) {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);

  function onClick() {
    return openRef.current?.();
  }

  const [scroll] = useWindowScroll();

  return (
    <>
      <div className={classes.wrapper}>
        <Dropzone
          accept={{ 'image/*': [] }}
          className={classes.dropzone}
          maxSize={20 * 1024 ** 2}
          onDrop={onDrop}
          openRef={openRef}
          radius='md'
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group position='center'>
              <Dropzone.Accept>
                <IconDownload color={theme.colors[theme.primaryColor][6]} size={50} stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX color={theme.colors.red[6]} size={50} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                  size={50}
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text align='center' mt='sm' size='lg' weight={700}>
              <Dropzone.Accept>Drop photos here</Dropzone.Accept>
              <Dropzone.Reject>Each file must be a photo and at most 20 MB in size</Dropzone.Reject>
              <Dropzone.Idle>Upload photos</Dropzone.Idle>
            </Text>
            <Text align='center' color='dimmed' mt='xs' size='sm'>
              Drag and drop photos here to upload them. Each photo's size must be less than 20 MB.
            </Text>
          </div>
        </Dropzone>

        <Button className={classes.control} onClick={onClick} radius='xl' size='md'>
          Select photos
        </Button>
      </div>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition mounted={scroll.y > 480} transition='slide-up'>
          {transitionStyles => (
            <Button
              leftIcon={<IconPhoto />}
              onClick={onClick}
              style={transitionStyles}
              sx={{ width: 140 }}
            >
              Add photos
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
