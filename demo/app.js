/* globals moment */
import { render, version } from 'inferno';
import MainComponent from './main';

console.log('version', version);

moment.locale('en');
// moment.locale('ru');

render(<MainComponent/>, document.getElementById('app'));