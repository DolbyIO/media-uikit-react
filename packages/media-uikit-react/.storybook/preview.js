import '@dolbyio/core-ui/dist/styles.css';
import './globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.preview,
  },
  designToken: {
    defaultTab: 'Colors',
  },
};

import themes from './themes';
