import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DropDownController from '../../src/components/DropDownController';
import SingleDatePicker from '../../src/components/SingleDatePicker';

describe('SingleDatePicker', () => {
  describe('#render', () => {
    it('renders a DropDownController', () => {
      const wrapper = shallow((
        <SingleDatePicker
          id="date"
          onDateChange={() => {}}
          onFocusChange={() => {}}
        />
      ));
      expect(wrapper.find(DropDownController)).to.have.lengthOf(1);
    });
  });
});
