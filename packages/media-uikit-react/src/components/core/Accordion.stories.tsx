import { Story } from '@storybook/react';
import React from 'react';
import Accordion from './Accordion';

export default {
  title: 'Components/Surfaces/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          'The accordion component allows the user to show and hide sections of related content on a page.',
      },
    },
  },
  argTypes: {
    expanded: {
      defaultValue: true,
    },
  },
};

const Template: Story = (args) => (
  <Accordion heading={<h3>Options</h3>} {...args}>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </Accordion>
);

export const Default = Template.bind({});
