import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SingleDatePickerInput from '../../src/components/SingleDatePickerInput';

describe('SingleDatePickerInput', () => {
  describe('#render', () => {
    it('is .SingleDatePickerInput class', () => {
      const wrapper = shallow(<SingleDatePickerInput id="date" />);
      expect(wrapper.is('.SingleDatePickerInput')).to.equal(true);
    });
  });
});
