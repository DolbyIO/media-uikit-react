module.exports = {
  rules: {
    // Prevent Storybook being flagged as a production dependency in our story files
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.*'],
      },
    ],
    // We export modified native elements so we want to allow any native prop to be passed in "as is" without having to explicitly allow it as a prop type
    'react/jsx-props-no-spreading': 'off',
  },
};
