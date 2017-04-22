import isSameDay from '../src/utils/isSameDay';
import moment from 'moment';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';
import '../css/styles.scss';

const datesList = [
  moment(),
  moment().add(1, 'days'),
  moment().add(3, 'days'),
  moment().add(9, 'days'),
  moment().add(10, 'days'),
  moment().add(11, 'days'),
  moment().add(12, 'days'),
  moment().add(13, 'days'),
];

const Demo = (props) => {
  let boxStyle = {
    backgroundColor: '#efefef',
    margin: 10,
    padding: 10
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
  let mobile = window.innerWidth < 600;
  return (
    <div className="flex-box flex-wrap">
      <Demo title="DatePicker Default"><DateRangePickerWrapper /></Demo>
      <Demo title="DatePicker with Dates">
      <DateRangePickerWrapper
            initialStartDate={moment().add(3, 'days')}
            initialEndDate={moment().add(10, 'days')}
      />
      </Demo>
      <Demo title="DatePicker with Custom Month" locale="ru">
      <DateRangePickerWrapper
            displayFormat="MMM D"
            initialStartDate={moment().add(3, 'days')}
            initialEndDate={moment().add(10, 'days')}
      />
      </Demo>
      <Demo title="DatePicker with Blocked Dates">
      <DateRangePickerWrapper
            isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      />
      </Demo>
      <Demo title="DatePicker with Highlighted Dates">
      <DateRangePickerWrapper
            isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      />
      </Demo>
      <Demo title="DatePicker with Minimal Nights 3">
      <DateRangePickerWrapper
            minimumNights={3}
            initialStartDate={moment().add(3, 'days')}
            initialEndDate={moment().add(10, 'days')}
      />
      </Demo>
      <Demo title="DatePicker on Mobile">
      <DateRangePickerWrapper
            numberOfMonths={mobile ? 1: 2}
            withPortal={mobile}
            // withFullScreenPortal={mobile}
            isOutsideRange={() => false}
      />
      </Demo>
      <Demo title="DatePicker Localized">
      <DateRangePickerWrapper
        showClearDates
        startDatePlaceholderText="Туда"
        endDatePlaceholderText="Обратно"
        monthFormat="MMMM YYYY"
        phrases={{
          closeDatePicker: 'закрыть',
          clearDates: 'отчистить',
        }}
      />
      </Demo>
    </div>
  );
};

module.exports = MainComponent;
