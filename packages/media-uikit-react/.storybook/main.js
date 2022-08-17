const path = require('path');

const toPath = (_path) => {
  console.log(_path);
  return path.resolve(process.cwd() + _path);
};

module.exports = {
  stories: [
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/design-tokens/**/*.stories.mdx',
    '../src/design-tokens/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    'storybook-design-token',
    '@storybook/addon-essentials',
    '@storybook/addon-jest',
    '@storybook/addon-storyshots',
    'storybook-css-modules',
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true },
    },
  ],
  framework: '@storybook/react',
  staticDirs: ['./public', '../../design-system/assets'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // @see https://duncanleung.com/import-svg-storybook-webpack-loader/
    const assetRule = config.module.rules.find(({ test }) => test.test('.svg'));
    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query,
    };
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack', assetLoader],
    });

    const cssModuleRegex = /\.module\.(css|scss)$/;
    config.module.rules.forEach((rule, idx) => {
      // Find rule tests for CSS.
      // Then make sure it excludes .module.css files.
      if (rule.test.test('foo.css')) {
        rule.exclude = rule.exclude
          ? Array.isArray(rule.exclude)
            ? [...rule.exclude, cssModuleRegex]
            : [rule.exclude, cssModuleRegex]
          : cssModuleRegex;
      }
    });

    // Add new rule to handle .module.scss files by using css-loader
    // with modules on.
    config.module.rules.push({
      test: /\.module\.(css|scss)$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-modules-typescript-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
          },
        },
        { loader: 'sass-loader' },
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': toPath('/../../node_modules/@emotion/react'),
      // You should add this row
      '@emotion/styled': toPath('/../../node_modules/@emotion/styled'),
      'emotion-theming': toPath('/../../node_modules/@emotion/react'),
    };
    // Return the altered config
    return config;
  },
};
