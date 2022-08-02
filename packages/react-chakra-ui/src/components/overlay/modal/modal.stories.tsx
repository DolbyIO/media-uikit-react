import { Meta, Story } from '@storybook/react';

import { useDisclosure } from '@chakra-ui/hooks';

import Button from '@dolbyio/react-chakra-ui/src/components/forms/button/button';

import ModalComp, {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from './modal';

export default {
  title: 'Components/Modal',
  component: ModalComp,
  argTypes: {
    children: { control: false },
  },
} as Meta;

export const Primary: Story = (args) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <ModalComp isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </ModalComp>
    </>
  );
};

Primary.args = {};
