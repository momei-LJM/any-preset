import antfu from '@antfu/eslint-config';

export default antfu({
  vue: true,
  rules: {
    'no-console': 'off',
    'vue/block-order': 'off',
    'antfu/top-level-function': 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/no-mutating-props': 'off',
    'ts/no-use-before-define': 'off',
  },
  formatters: {
    css: true,
  },
});
