import { Meta, Story } from '@storybook/react';

import { GradientTypes } from '@dolbyio/react-chakra-ui/src/design-tokens';

import ProgressComp, { ProgressProps } from './progress';

export default {
  title: 'Components/Progress',
  component: ProgressComp,
  argTypes: {
    width: {
      control: false,
    },
    gradient: {
      options: Object.values(GradientTypes),
      control: { type: 'select' },
    },
  },
  args: {
    width: '30%',
  },
} as Meta;

export const Primary: Story<ProgressProps> = (args) => <ProgressComp {...args}></ProgressComp>;

Primary.args = {
  value: 75,
  gradient: GradientTypes.BlueToPurple,
};
