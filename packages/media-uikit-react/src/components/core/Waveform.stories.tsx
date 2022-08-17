import { WaveformProps } from '@dolbyio/media-uikit-react';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import Waveform from './Waveform';

export default {
  title: 'Components/DataDisplay/Waveform',
  component: Waveform,
  parameters: {
    controls: { include: [] },
  },
};

const Template: Story<WaveformProps> = (args) => {
  return <Waveform {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  url: '/media/naina-premaster.wav',
  previewActive: true,
};

export const LoopActive = Template.bind({});
LoopActive.args = {
  url: '/media/naina-premaster.wav',
  loopActive: true,
};

export const NoInteraction = Template.bind({});
NoInteraction.args = {
  url: '/media/naina-premaster.wav',
  interact: false,
};

export const NoPreview = Template.bind({});
NoPreview.args = {
  url: '/media/naina-premaster.wav',
  previewActive: false,
};

export const PreviewNotDraggable = Template.bind({});
PreviewNotDraggable.args = {
  url: '/media/naina-premaster.wav',
  previewActive: true,
  isPreviewDraggable: false,
};

export const LoopDefaultOff = Template.bind({});
LoopDefaultOff.args = {
  url: '/media/naina-premaster.wav',
  previewActive: true,
  loopActive: false,
};

export const HasNoLoopControl = Template.bind({});
HasNoLoopControl.args = {
  url: '/media/naina-premaster.wav',
  hasLoopControl: false,
};

export const PreviewNotResizeable = Template.bind({});
PreviewNotResizeable.args = {
  url: '/media/naina-premaster.wav',
  isPreviewResizable: false,
};

export const ChangeWaveformColor = Template.bind({});
ChangeWaveformColor.args = {
  url: '/media/naina-premaster.wav',
  waveColor: 'blue',
};

export const ChangeWaveformProgressColor = Template.bind({});
ChangeWaveformProgressColor.args = {
  url: '/media/naina-premaster.wav',
  waveProgressColor: 'pink',
};

export const InitialPreviewStartEnd = Template.bind({});
InitialPreviewStartEnd.args = {
  url: '/media/naina-premaster.wav',
  preview: { start: 0, end: 30 },
};

export const PreventDefaultControls = Template.bind({});
PreventDefaultControls.args = {
  url: '/media/naina-premaster.wav',
  preventDefaultControls: true,
};
