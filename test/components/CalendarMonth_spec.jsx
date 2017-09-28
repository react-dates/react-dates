import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarMonth from '../../src/components/CalendarMonth';

describe('CalendarMonth', () => {
  describe('#render', () => {
    describe('data-visible attribute', () => {
      it('data-visible attribute is truthy if props.isVisible', () => {
        const wrapper = shallow(<CalendarMonth isVisible />).dive();
        expect(wrapper.prop('data-visible')).to.equal(true);
      });

      it('data-visible attribute is falsey if !props.isVisible', () => {
        const wrapper = shallow(<CalendarMonth isVisible={false} />).dive();
        expect(wrapper.prop('data-visible')).to.equal(false);
      });
    });

    describe('caption', () => {
      it('.CalendarMonth__caption id is present', () => {
        const wrapper = shallow(<CalendarMonth />);
        expect(wrapper.find('#CalendarMonth__caption')).to.have.lengthOf(1);
      });

      it('text is the correctly formatted month title', () => {
        const MONTH = moment();
        const caption = shallow(<CalendarMonth month={MONTH} />).find('#CalendarMonth__caption');
        expect(caption.text()).to.equal(MONTH.format('MMMM YYYY'));
      });
    });
  });
});
