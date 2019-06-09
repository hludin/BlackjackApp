module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'extends': 'standard',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    "semi-style": ["error", "last"],
    "semi-spacing": ["error", { "before": false, "after": true }],
    "semi": ["error", "always"],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"]
  }
}
