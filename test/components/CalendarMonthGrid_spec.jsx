import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarMonth from '../../src/components/CalendarMonth';
import CalendarMonthGrid from '../../src/components/CalendarMonthGrid';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE } from '../../constants';

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

  it('works with the same number of months', () => {
    const initialMonth = moment();
    const wrapper = shallow(<CalendarMonthGrid numberOfMonths={12} initialMonth={initialMonth} />);

    wrapper.instance().componentWillReceiveProps({
      initialMonth,
      numberOfMonths: 12,
      firstVisibleMonthIndex: 0,
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

  describe('#onMonthSelect', () => {
    describe('has transitionMonths', () => {
      it('calls onMonthChange with the month that should render first', () => {
        const onMonthChangeStub = sinon.stub();
        const wrapper = shallow(
          <CalendarMonthGrid
            orientation={HORIZONTAL_ORIENTATION}
            onMonthChange={onMonthChangeStub}
          />,
        );
        const month1 = moment();
        const month2 = moment().add(1, 'months');
        const month3 = moment().add(2, 'months');
        const months = [month1, month2, month3];
        wrapper.setState({
          months,
        });
        wrapper.instance().onMonthSelect(month3, 10);
        const calledWithDate = month3.set('month', 10).subtract('1', 'months');
        expect(onMonthChangeStub.calledWith(calledWithDate)).to.equal(true);
      });
    });

    describe('doesnt have transitionMonths', () => {
      it('calls onMonthChange with the month that should render first', () => {
        const onMonthChangeStub = sinon.stub();
        const wrapper = shallow(
          <CalendarMonthGrid
            orientation={VERTICAL_SCROLLABLE}
            onMonthChange={onMonthChangeStub}
          />,
        );
        const month1 = moment();
        const month2 = moment().add(1, 'months');
        const month3 = moment().add(2, 'months');
        const months = [month1, month2, month3];
        wrapper.instance().setState({
          months,
        });
        wrapper.instance().onMonthSelect(month3, 10);
        const calledWithDate = month3.set('month', 10).subtract('2', 'months');
        expect(onMonthChangeStub.calledWith(calledWithDate)).to.equal(true);
      });
    });
  });

  describe('#onYearSelect', () => {
    describe('has transitionMonths', () => {
      it('calls onYearChange with the month that should render first', () => {
        const onYearChangeStub = sinon.stub();
        const wrapper = shallow(
          <CalendarMonthGrid
            orientation={HORIZONTAL_ORIENTATION}
            onYearChange={onYearChangeStub}
          />,
        );
        const month1 = moment();
        const month2 = moment().add(1, 'months');
        const month3 = moment().add(2, 'months');
        const months = [month1, month2, month3];
        wrapper.setState({
          months,
        });
        wrapper.instance().onYearSelect(month3, '1999');
        const calledWithDate = month3.set('year', '1999').subtract('1', 'months');
        expect(onYearChangeStub.calledWith(calledWithDate)).to.equal(true);
      });
    });

    describe('doesnt have transitionMonths', () => {
      it('calls onMonthChange with the month that should render first', () => {
        const onYearChangeStub = sinon.stub();
        const wrapper = shallow(
          <CalendarMonthGrid
            orientation={VERTICAL_SCROLLABLE}
            onYearChange={onYearChangeStub}
          />,
        );
        const month1 = moment();
        const month2 = moment().add(1, 'months');
        const month3 = moment().add(2, 'months');
        const months = [month1, month2, month3];
        wrapper.setState({
          months,
        });
        wrapper.instance().onYearSelect(month3, '1999');
        const calledWithDate = month3.set('year', '1999').subtract('2', 'months');
        expect(onYearChangeStub.calledWith(calledWithDate)).to.equal(true);
      });
    });
  });
});
