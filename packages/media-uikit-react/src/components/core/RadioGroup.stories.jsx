/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import RadioGroup from './RadioGroup';

export default {
  title: 'Components/Inputs/RadioGroup',
  component: RadioGroup,
};

const Template = (args) => <RadioGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Default',
  values: [16000, 32000, 44100, 48000],
  defaultValue: 3200,
  onChangeValue: (v) => console.log(v),
};

export const EmptyValues = Template.bind({});
EmptyValues.args = {
  name: 'EmptyValues',
  values: [],
  defaultValue: 0,
};

export const DuplicateValues = Template.bind({});
DuplicateValues.args = {
  ...Default.args,
  values: [16000, 32000, 44100, 44100, 48000, 48000],
};

export const InvalidDefualt = Template.bind({});
InvalidDefualt.args = {
  ...Default.args,
  defaultValue: 900,
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  ...Default.args,
  displayTitle: false,
};
