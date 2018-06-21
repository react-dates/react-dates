const path = require('path');

const { RemoteBrowserTarget } = require('happo.io');
const happoPluginStorybook = require('happo-plugin-storybook');
const happoPluginPuppeteer = require('happo-plugin-puppeteer');

// API tokens are available at https://happo.io/a/32/account for administrators
// of the react-dates account on happo.io.
const { HAPPO_API_KEY: apiKey, HAPPO_API_SECRET: apiSecret } = process.env;

module.exports = {
  apiKey,
  apiSecret,

  // Define the browser targets to take screenshots in:
  targets: {
    large: new RemoteBrowserTarget('chrome', {
      viewport: '900x600',
    }),
    small: new RemoteBrowserTarget('chrome', {
      viewport: '320x640',
    }),
  },

  plugins: [
    happoPluginStorybook({ configDir: '.storybook-css' }),
    happoPluginPuppeteer(),
  ],
};
