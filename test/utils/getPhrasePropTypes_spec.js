import { expect } from 'chai';
import { PropTypes } from 'react';

import getPhrasePropTypes from '../../src/utils/getPhrasePropTypes';

const PhraseObject = {
  foo: 'x',
  bar: 'y',
  baz: 'z',
};

describe('#getPhrasePropTypes', () => {
  it('contains each key from the original object', () => {
    const propTypes = getPhrasePropTypes(PhraseObject);
    Object.keys(PhraseObject).forEach((key) => {
      expect(Object.keys(propTypes).filter(type => type === key).length).to.not.equal(0);
    });
  });

  it('each value is equal to PropTypes.node', () => {
    const propTypes = getPhrasePropTypes(PhraseObject);
    Object.values(propTypes).forEach((value) => {
      expect(value).to.equal(PropTypes.node);
    });
  });
});
