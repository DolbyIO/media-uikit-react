/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import AudioConfigurator from './AudioConfigurator';

export default {
  title: 'Modules/AudioConfigurator',
  component: AudioConfigurator,
};

const Template = (args) => <AudioConfigurator {...args} />;

export const Default = Template.bind({});
Default.args = {
  sampleRates: [44100, 48000],
  defaultSampleRate: 44100,
  channelCounts: [1, 2],
  defaultChannelCount: 1,
  sampleSizes: [16, 24, 32],
  defaultSampleSize: 16,
  onChangeSampleRate: (s) => console.log(s),
  onChangeChannelCount: (c) => console.log(c),
  onChangeSampleSize: (s) => console.log(s),
};

export const EmptySampleSize = Template.bind({});
EmptySampleSize.args = {
  ...Default.args,
  sampleSizes: [],
  defaultSampleSize: 44100,
};

export const SingleChannelCount = Template.bind({});
SingleChannelCount.args = {
  ...Default.args,
  channelCounts: [1],
  defaultChannelCount: 1,
};
