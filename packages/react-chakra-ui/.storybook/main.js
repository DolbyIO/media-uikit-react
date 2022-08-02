module.exports = {
  framework: '@storybook/react',
  core: { builder: 'webpack5' },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@nrwl/react/plugins/storybook',
    '@chakra-ui/storybook-addon',
    'storybook-design-token',
    '@storybook/addon-essentials',
  ],
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  },
};
