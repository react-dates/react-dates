import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import getPhrase from '../../src/utils/getPhrase';

describe('getPhrase', () => {
  it('returns empty string when arg is falsy', () => {
    expect(getPhrase()).to.equal('');
  });

  it('returns arg if arg is a string', () => {
    const test = 'foobarbaz';
    expect(getPhrase(test)).to.equal(test);
  });

  describe('arg is a function', () => {
    it('returns invoked arg', () => {
      const test = 'this is a new test string';
      const phraseFunc = sinon.stub().returns(test);
      const phrase = getPhrase(phraseFunc);
      expect(phraseFunc.callCount).to.equal(1);
      expect(phrase).to.equal(test);
    });

    it('passes second arg into the invoked function', () => {
      const testObj = { hello: 'world' };
      const phraseFunc = sinon.stub();
      getPhrase(phraseFunc, testObj);
      expect(phraseFunc.getCall(0).args[0]).to.equal(testObj);
    });
  });
});
