import React from 'react';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

import moment from 'moment';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import { addDecorator } from '@storybook/react';

import registerInterfaceWithDefaultTheme from '../src/utils/registerInterfaceWithDefaultTheme';

import '../css/storybook.scss';

registerInterfaceWithDefaultTheme(aphroditeInterface);

addDecorator(story => {
  moment.locale('en');
  return story();
});

function getLink(href, text) {
  return `<a href=${href} rel="noopener noreferrer" target="_blank">${text}</a>`;
}

const README = getLink(
  'https://github.com/airbnb/react-dates/blob/master/README.md',
  'README'
);
const wrapperSource = getLink(
  'https://github.com/airbnb/react-dates/tree/master/examples',
  'wrapper source'
);

const helperText = `All examples are built using a wrapper component that is not exported by
  react-dates. Please see the ${README} for more information about minimal setup or explore
  the ${wrapperSource} to see how to integrate react-dates into your own app.`;

addDecorator(story => (
  <div>
    <div
      style={{
        background: '#fff',
        height: 6 * 8,
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '8px 40px 8px 8px',
        overflow: 'scroll'
      }}
      dangerouslySetInnerHTML={{ __html: helperText }}
    />

    <div style={{ marginTop: 7 * 8 }}>{story()}</div>
  </div>
));
