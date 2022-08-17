/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Page from './Page';

export default {
  title: 'Stories/MediaConfigPage',
  component: Page,
};

const Template = (args) => <Page {...args} />;

export const MediaConfig = Template.bind({});
