import { addons } from '@storybook/addons';
import themes from './themes';
import './globals.css';

addons.setConfig({
  theme: themes.manager,
});
