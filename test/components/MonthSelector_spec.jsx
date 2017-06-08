import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import moment from 'moment';

import MonthSelector from '../../src/components/MonthSelector';

describe('MonthSelector', () => {
  describe('#render', () => {
    it('chooses the current month by default', () => {
      const date = moment('2016-02-20');
      const wrapper = shallow(
        <MonthSelector month={date} />,
      );
      expect(wrapper.find('.MonthSelector__month_select').prop('value')).to.equal(1);
    });

    it('chooses the current year by default', () => {
      const date = moment('2016-02-20');
      const wrapper = shallow(
        <MonthSelector month={date} />,
      );
      expect(wrapper.find('.MonthSelector__year_select').prop('value')).to.equal(2016);
    });

    describe('month select button', () => {
      it('has .MonthSelector__month_select class', () => {
        const wrapper = shallow(<MonthSelector />);
        expect(wrapper.find('.MonthSelector__month_select')).to.have.lengthOf(1);
      });

      it('has options for all months', () => {
        const wrapper = shallow(<MonthSelector />);
        expect(wrapper.find('.MonthSelector__month_select option')).to.have.lengthOf(12);
      });

      it('has the proper month first', () => {
        const wrapper = shallow(<MonthSelector />);
        const option = wrapper.find('.MonthSelector__month_select option').first();
        expect(option.prop('value')).to.equal(0);
        expect(option.text()).to.equal('January');
      });

      it('has the proper month last', () => {
        const wrapper = shallow(<MonthSelector />);
        const option = wrapper.find('.MonthSelector__month_select option').last();
        expect(option.prop('value')).to.equal(11);
        expect(option.text()).to.equal('December');
      });
    });

    describe('year select button', () => {
      it('has .MonthSelector__year_select class', () => {
        const wrapper = shallow(<MonthSelector />);
        expect(wrapper.find('.MonthSelector__year_select')).to.have.lengthOf(1);
      });

      it('has options for 56 years', () => {
        const wrapper = shallow(<MonthSelector />);
        expect(wrapper.find('.MonthSelector__year_select option')).to.have.lengthOf(56);
      });

      it('has the proper year first', () => {
        const date = moment('2016-02-20');
        const wrapper = shallow(<MonthSelector month={date} />);
        const option = wrapper.find('.MonthSelector__year_select option').first();
        expect(option.prop('value')).to.equal(1966);
        expect(option.text()).to.equal('1966');
      });

      it('has the proper year last', () => {
        const date = moment('2016-02-20');
        const wrapper = shallow(<MonthSelector month={date} />);
        const option = wrapper.find('.MonthSelector__year_select option').last();
        expect(option.prop('value')).to.equal(2021);
        expect(option.text()).to.equal('2021');
      });
    });
  });

  describe('#onMonthSelect', () => {
    it('is triggered by the selection of a month', () => {
      const onMonthSelectStub = sinon.stub();
      const date = moment('2016-02-20');
      const monthSelect = shallow(
        <MonthSelector onMonthSelect={onMonthSelectStub} month={date} />,
      ).find('.MonthSelector__month_select');
      monthSelect.simulate('change', { target: { value: 'month' } });
      expect(onMonthSelectStub.calledWith(date, 'month')).to.equal(true);
    });
  });

  describe('#onYearSelect', () => {
    it('is triggered by the selection of a year', () => {
      const onYearSelectStub = sinon.stub();
      const date = moment('2016-02-20');
      const yearSelect = shallow(
        <MonthSelector onYearSelect={onYearSelectStub} month={date} />,
      ).find('.MonthSelector__year_select');
      yearSelect.simulate('change', { target: { value: 'year' } });
      expect(onYearSelectStub.calledWith(date, 'year')).to.equal(true);
    });
  });
});
