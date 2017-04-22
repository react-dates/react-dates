/* globals moment */
import Inferno from 'inferno';
import MainComponent from './main';

moment.locale('en');
// moment.locale('ru');

Inferno.render(<MainComponent/>, document.getElementById('app'));
