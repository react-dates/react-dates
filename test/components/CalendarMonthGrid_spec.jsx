import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarMonth from '../../src/components/CalendarMonth';
import CalendarMonthGrid, { getMonths } from '../../src/components/CalendarMonthGrid';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

import getTransformStyles from '../../src/utils/getTransformStyles';

describe('CalendarMonthGrid', () => {
  it('is .CalendarMonthGrid class', () => {
    const wrapper = shallow(<CalendarMonthGrid />);
    expect(wrapper.is('.CalendarMonthGrid')).to.equal(true);
  });

  it('is .CalendarMonthGrid--horizontal class if props.orientation === HORIZONTAL_ORIENTATION',
    () => {
      const wrapper = shallow(<CalendarMonthGrid orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.is('.CalendarMonthGrid--horizontal')).to.equal(true);
    });

  it('is .CalendarMonthGrid--vertical class if props.orientation === VERTICAL_ORIENTATION',
    () => {
      const wrapper = shallow(<CalendarMonthGrid orientation={VERTICAL_ORIENTATION} />);
      expect(wrapper.is('.CalendarMonthGrid--vertical')).to.equal(true);
    });

  it('is .CalendarMonthGrid--animating class if props.isAnimating === true', () => {
    const wrapper = shallow(<CalendarMonthGrid isAnimating />);
    expect(wrapper.is('.CalendarMonthGrid--animating')).to.equal(true);
  });

  it('is not .CalendarMonthGrid--animating class if props.isAnimating === false', () => {
    const wrapper = shallow(<CalendarMonthGrid isAnimating={false} />);
    expect(wrapper.is('.CalendarMonthGrid--animating')).to.equal(false);
  });

  it('the number of CalendarMonths rendered matches props.numberOfMonths + 2', () => {
    const NUM_OF_MONTHS = 5;
    const wrapper = shallow(<CalendarMonthGrid numberOfMonths={NUM_OF_MONTHS} />);
    expect(wrapper.find(CalendarMonth)).to.have.lengthOf(NUM_OF_MONTHS + 2);
  });

  it('has style equal to getTransformStyles(foo)', () => {
    const transformValue = 'foo';
    const transformStyles = getTransformStyles(transformValue);
    const wrapper = shallow(<CalendarMonthGrid transformValue={transformValue} />);
    Object.keys(transformStyles).forEach((key) => {
      expect(wrapper.prop('style')[key]).to.equal(transformStyles[key]);
    });
  });

  it('does not generate duplicate months', () => {
    const initialMonth = moment();
    const wrapper = shallow(<CalendarMonthGrid numberOfMonths={12} initialMonth={initialMonth} />);

    wrapper.instance().componentWillReceiveProps({
      initialMonth,
      numberOfMonths: 24,
    });

    const months = wrapper.state().months;

    const collisions = months
      .map(m => m.format('YYYY-MM'))
      .reduce((acc, m) => Object.assign(
        {},
        acc,
        { [m]: true },
      ), {});

    expect(Object.keys(collisions).length).to.equal(months.length);
  });

  describe('#getMonths', () => {
    it('returns the same number of months when addTransitionMonths is false', () => {
      expect(getMonths({
        initialMonth: moment(),
        numberOfMonths: 2,
        addTransitionMonths: false,
      })).to.have.length(2);
    });

    it('adds additional month before and after when addTransitionMonths is true', () => {
      expect(getMonths({
        initialMonth: moment(),
        numberOfMonths: 10,
        addTransitionMonths: true,
      })).to.have.length(12);
    });

    it('prepends previous month when addTransitionMonths is true', () => {
      const initialMonth = moment();
      const prevMonth = initialMonth.clone().subtract(1, 'month');

      const months = getMonths({
        initialMonth,
        numberOfMonths: 2,
        addTransitionMonths: true,
      });

      expect(months[0].format('YYYY-MM')).to.equal(prevMonth.format('YYYY-MM'));
    });

    it('appends additional month when addTransitionMonths is true', () => {
      const initialMonth = moment();
      const numberOfMonths = 2;

      // Example:
      // initialMonth = Jan
      // numberOfMonths = 2
      // followingMonth = Jan + 2 = Mar
      // expected months = [ Dec, Jan, Feb, Mar ]
      const followingMonth = initialMonth.clone().add(numberOfMonths, 'month');

      const months = getMonths({
        initialMonth,
        numberOfMonths,
        addTransitionMonths: true,
      });

      expect(
        months[months.length - 1].format('YYYY-MM')
      ).to.equal(followingMonth.format('YYYY-MM'));
    });
  });

  describe('#componentWillReceiveProps', () => {
    it('updates months when numberOfMonths changes', () => {
      const initialMonth = moment();
      const wrapper = shallow(
        <CalendarMonthGrid
          addTransitionMonths={false}
          numberOfMonths={2}
          initialMonth={initialMonth}
        />
      );

      wrapper.instance().componentWillReceiveProps({
        initialMonth,
        numberOfMonths: 4,
      });
      expect(wrapper.state('months')).to.have.length(4);
    });
  });
});
