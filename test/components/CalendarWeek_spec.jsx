import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import CalendarWeek from '../../src/components/CalendarWeek';

import CalendarDay from '../../src/components/CalendarDay';

describe('CalendarWeek', () => {
  it('renders a tr', () => {
    const wrapper = shallow((
      <CalendarWeek>
        <CalendarDay />
      </CalendarWeek>
    ));
    expect(wrapper.is('tr')).to.equal(true);
  });
  it('accepts a React node', () => {
    const wrapper = shallow((
      <CalendarWeek>
        <></>
      </CalendarWeek>
    ));
    expect(wrapper.is('tr')).to.equal(true);
    expect(wrapper).to.not.throw();
  });
});
