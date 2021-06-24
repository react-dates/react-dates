import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import DefaultTheme from '../theme/DefaultTheme';
export default function registerInterfaceWithDefaultTheme(reactWithStylesInterface) {
  ThemedStyleSheet.registerInterface(reactWithStylesInterface);
  ThemedStyleSheet.registerTheme(DefaultTheme);
}