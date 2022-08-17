import { Story } from '@storybook/react';
import React, { useState } from 'react';
import TextField from './TextField';

export default {
  title: 'Components/Inputs/TextField',
  component: TextField,
  parameters: {
    controls: {
      include: ['label', 'caption', 'error', 'placeholder'],
    },
    docs: {
      description: {
        component: 'Text fields let users enter and edit text.',
      },
    },
  },
  argTypes: {
    label: {
      defaultValue: 'Label title',
    },
    caption: {
      defaultValue: 'Info about the input content here.',
    },
    error: {
      defaultValue: false,
    },
    placeholder: {
      defaultValue: 'Placeholder text',
      description: 'Text that appears in the form control when it has no value set.',
    },
  },
};

const Template: Story = (args) => {
  const [value, setValue] = useState('');

  return <TextField onChange={(e) => setValue(e.currentTarget.value)} value={value} {...args} />;
};

export const Default = Template.bind({});
