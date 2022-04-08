module.exports = {
  content: [
    './app/components/*.js',
    './App.js',
    './app/scenes/auth/*.js',
    './app/scenes/home/*.js',
    './app/scenes/user/*.js',
    './app/scenes/contact/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
