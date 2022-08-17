const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup');
const svgr = require('@svgr/rollup');
const postcss = require('rollup-plugin-postcss');

module.exports = (config) => {
  const nxConfig = nrwlConfig(config);
  const bundleConfig = {
    ...nxConfig,
    plugins: [
      svgr(),
      postcss({ inject: true }),
      ...nxConfig.plugins.filter((p) => p.name !== 'postcss'),
    ],
    external: ['@dolbyio/design-system/*', '@dolbyio/core-ui/*'],
  };

  // console.log(JSON.stringify(bundleConfig, null, 2));
  return bundleConfig;
};
