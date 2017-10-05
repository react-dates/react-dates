import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';

import DefaultTheme from '../../src/theme/DefaultTheme';

ThemedStyleSheet.registerTheme(DefaultTheme);
ThemedStyleSheet.registerInterface(aphroditeInterface);
