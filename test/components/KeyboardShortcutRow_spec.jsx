import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import KeyboardShortcutRow from '../../src/components/KeyboardShortcutRow';

describe('KeyboardShortcutRow', () => {
  it('is an li', () => {
    const wrapper = shallow(
      <KeyboardShortcutRow
        unicode="foo"
        label="bar"
        action="baz"
      />,
    ).dive();
    expect(wrapper.is('li')).to.equal(true);
  });
});
