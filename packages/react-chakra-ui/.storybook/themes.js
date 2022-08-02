import { create } from '@storybook/theming';

const base = {
  // barBg: '#000',
  colorSecondary: '#AA33FF',
  fontBase: '"DIN Next LT Pro", sans-serif',
  // fontCode: '"Source Code Pro", monospace',
  // textColor: '#111010',
};

const themes = {
  manager: create({
    ...base,
    base: 'dark',
    appBg: '#000',
    brandTitle: 'Dolby.io',
    brandUrl: 'https://dolby.io/',
  }),
  preview: create({
    ...base,
    base: 'light',
  }),
};

export default themes;
