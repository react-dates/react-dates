import React from 'react';
import ReactDOM from 'react-dom';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';
import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';
import PresetDateRangePickerWrapper from '../examples/PresetDateRangePicker';

function App() {
  return (
    <div>
      <DateRangePickerWrapper autoFocus />
      <SingleDatePickerWrapper autoFocus />
      <PresetDateRangePickerWrapper autoFocus />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
