import { Story } from '@storybook/react';
import React, { useState } from 'react';
import Slider from './Slider';

export default {
  title: 'Components/Inputs/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: 'The slider component allows the user to set values on a continuous scale.',
      },
    },
  },
};

const Template: Story = (args) => {
  return <Slider {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: 30,
  min: 0,
  max: 100,
};
