import { Meta, Story } from '@storybook/react';

import ButtonComp from './button';

export default {
  title: 'Components/Button',
  component: ButtonComp,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'radio' },
    },
    onClick: { action: 'clicked' },
  },
} as Meta;

export const Primary: Story = (args) => <ButtonComp {...args} />;

Primary.args = {
  disabled: false,
  variant: 'primary',
  children: 'Primary Button',
};

export const Secondary: Story = (args) => <ButtonComp {...args} />;
Secondary.args = {
  disabled: false,
  variant: 'secondary',
  children: 'Secondary Button',
};
