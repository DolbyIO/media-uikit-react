import { create } from '@storybook/theming';

const base = {
  // barBg: '#000',
  colorSecondary: '#AA33FF',
  fontBase: '"Avenir Next Medium", sans-serif',
  // fontCode: '"Source Code Pro", monospace',
  // textColor: '#111010',
};

const themes = {
  manager: create({
    ...base,
    base: 'dark',
    appBg: '#000',
    brandImage: '/logo.webp',
    brandTitle: 'Dolby.io',
    brandUrl: 'https://dolby.io/',
  }),
  preview: create({
    ...base,
    base: 'light',
  }),
};

export default themes;
