module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "no-console": 0,
    "camelcase": ["error", {"allow": ["aa_bb"]}],
    // "no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
    // "no-multiple-empty-lines": [1, {"max": 3}],//空行最多不能超过2行
    "no-unused-vars": [1, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
    "indent": [2, 2],//缩进风格
    "camelcase": 0,//强制驼峰法命名
  }
}