import { Meta, Story } from '@storybook/react';

import LinkComp from './link';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default {
  title: 'Components/Link',
  component: LinkComp,
  argTypes: {
    children: { control: false },
  },
} as Meta;

export const Primary: Story = (args) => <LinkComp {...args} />;

Primary.args = {
  children: (
    <>
      Dolby IO Link <ChevronRightIcon boxSize={5} />
    </>
  ),
  isExternal: true,
  href: 'https://dolby.io',
};
