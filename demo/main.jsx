// require('./css/flexbox.css');

// var CrossfadeExample = require('./examples/crossfade-example');
// var FlapBox = require('./examples/flap-box');
// var ScrollingGroup = require('./examples/scrolling-group');
// var ToggleBox = require('./examples/toggle-box');
// var TriggerBox = require('./examples/trigger-box');

import { DateRangePickerWrapper } from '../stories/DateRangePicker';
import '../css/styles.scss';

const Demo = (props) => {
  let boxStyle = {
    backgroundColor: '#efefef',
    margin: 10,
    padding: '0 0 10px 0',
    height: 300
  };

  let headingStyle = {
    margin: '10px 0',
    padding: '10px',
    width: '100%',
    textAlign: 'center',
    fontWeight: 200,
    fontSize: 18,
    borderBottom: '1px solid #e5e5e5'
  };

  return (
    <div className="flex-box flex-row align-items-center" style={boxStyle}>
      <h3 style={headingStyle}>{props.title}</h3>
      {props.children}
    </div>
  );
};

const MainComponent = () => {
  return (
    <div className="flex-box flex-wrap">
      <Demo title="DatePicker Default"><DateRangePickerWrapper /></Demo>
    </div>
  );
};

module.exports = MainComponent;
