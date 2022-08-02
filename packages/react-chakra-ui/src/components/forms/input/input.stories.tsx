import { Meta, Story } from '@storybook/react';

import { Stack } from '@chakra-ui/react';

import InputComp, { InputGroup, InputLeftElement } from './input';

export default {
  title: 'Components/Input',
  component: InputComp,
  argTypes: {
    variant: {
      options: ['outline', 'filled', 'flushed', 'unstyled'],
      control: { type: 'radio' },
    },
    width: { control: false },
    paddingLeft: { control: false },
  },
  args: {
    width: '30%',
  },
} as Meta;

export const Primary: Story = (args) => <InputComp {...args} />;

Primary.args = {
  placeholder: 'Placeholder',
  variant: 'outline',
};

const leftElementArgs = (children: any): any => ({
  children,
  pointerEvents: 'none',
  color: 'base.gray.09.value',
  fontSize: 'sm',
  justifyContent: 'flex-start',
});

export const AddElementsInsideInput: Story = (args) => (
  <Stack>
    <InputGroup>
      <InputLeftElement {...leftElementArgs('Title')} />
      <InputComp {...args} />
    </InputGroup>
    <InputGroup>
      <InputLeftElement {...leftElementArgs('Artist')} />
      <InputComp {...args} />
    </InputGroup>
    <InputGroup>
      <InputLeftElement {...leftElementArgs('Genre')} />
      <InputComp {...args} />
    </InputGroup>
  </Stack>
);

AddElementsInsideInput.args = {
  paddingLeft: 50,
  variant: 'flushed',
};
