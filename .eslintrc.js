module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    "no-underscore-dangle":  ["error", { "allow": ["_id"] }]

  },
};
