import { extendTheme } from '@chakra-ui/react';

import { Colors, Gradients } from '@dolbyio/design-system';

import {
  ButtonStyleConfig,
  InputStyleConfig,
  SelectStyleConfig,
  LinkStyleConfig,
  ProgressStyleConfig,
} from '@dolbyio/react-chakra-ui';

const colors = {
  ...Colors.color,
  ...Gradients.color,
};

const theme = extendTheme({
  colors,
  components: {
    Button: ButtonStyleConfig,
    Input: InputStyleConfig,
    Select: SelectStyleConfig,
    Link: LinkStyleConfig,
    Progress: ProgressStyleConfig,
  },
});

export default theme;
