import { Story, Meta } from '@storybook/react';
import { NavBar } from './nav-bar';

export default {
  component: NavBar,
  title: 'NavBar',
} as Meta;

const Template: Story<{}> = (args) => <NavBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
