import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'REACT-DATES',
    brandUrl: 'https://github.com/airbnb/react-dates'
  })
});
