import { Meta, Story } from '@storybook/react';

import SelectComp from './select';

export default {
  title: 'Components/Select',
  component: SelectComp,
  argTypes: {
    variant: {
      options: ['outline', 'filled', 'flushed', 'unstyled'],
      control: { type: 'radio' },
    },
    width: {
      control: false,
    },
  },
  args: {
    width: '30%',
  },
} as Meta;

export const Primary: Story = (args) => (
  <SelectComp {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </SelectComp>
);

Primary.args = {
  placeholder: 'Placeholder',
};
