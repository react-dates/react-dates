import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarMonth from '../../src/components/CalendarMonth';
import CalendarMonthGrid from '../../src/components/CalendarMonthGrid';

import getTransformStyles from '../../src/utils/getTransformStyles';

describe('CalendarMonthGrid', () => {
  it('the number of CalendarMonths rendered matches props.numberOfMonths + 2', () => {
    const NUM_OF_MONTHS = 5;
    const wrapper = shallow(<CalendarMonthGrid numberOfMonths={NUM_OF_MONTHS} />).dive();
    expect(wrapper.find(CalendarMonth)).to.have.lengthOf(NUM_OF_MONTHS + 2);
  });

  it('has style equal to getTransformStyles(foo)', () => {
    const translationValue = 'foo';
    const transformStyles = getTransformStyles(`translateX(${translationValue}px)`);
    const wrapper = shallow(<CalendarMonthGrid translationValue={translationValue} />).dive();
    Object.keys(transformStyles).forEach((key) => {
      expect(wrapper.prop('style')[key]).to.equal(transformStyles[key]);
    });
  });

  it('does not generate duplicate months', () => {
    const initialMonth = moment();
    const wrapper = shallow((
      <CalendarMonthGrid numberOfMonths={12} initialMonth={initialMonth} />
    )).dive();

    wrapper.instance().componentWillReceiveProps({
      initialMonth,
      numberOfMonths: 24,
    });

    const { months } = wrapper.state();

    const collisions = months
      .map(m => m.format('YYYY-MM'))
      .reduce((acc, m) => ({ ...acc, [m]: true }), {});

    expect(Object.keys(collisions).length).to.equal(months.length);
  });

  it('works with the same number of months', () => {
    const initialMonth = moment();
    const wrapper = shallow((
      <CalendarMonthGrid numberOfMonths={12} initialMonth={initialMonth} />
    )).dive();

    wrapper.instance().componentWillReceiveProps({
      initialMonth,
      numberOfMonths: 12,
      firstVisibleMonthIndex: 0,
    });

    const { months } = wrapper.state();

    const collisions = months
      .map(m => m.format('YYYY-MM'))
      .reduce((acc, m) => ({ ...acc, [m]: true }), {});

    expect(Object.keys(collisions).length).to.equal(months.length);
  });
});
