import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow, mount } from 'enzyme';
import wrap from 'mocha-wrap';

import OutsideClickHandler from '../../src/components/OutsideClickHandler';

describe('OutsideClickHandler', () => {
  describe('#render', () => {
    it('has `childNode` ref', () => {
      const wrapper = shallow(<OutsideClickHandler />);
      expect(wrapper.node.ref).to.equal('childNode');
    });
  });

  describe.skip('lifecycle methods', () => {
    wrap()
    .withOverride(() => document, 'attachEvent', () => sinon.stub())
    .describe('#componentDidMount', () => {
      let addEventListenerStub;
      beforeEach(() => {
        addEventListenerStub = sinon.stub(document, 'addEventListener');
      });

      it('document.addEventListener is called with `click` & onOutsideClick', () => {
        const wrapper = mount(<OutsideClickHandler />);
        const onOutsideClick = wrapper.instance().onOutsideClick;
        expect(addEventListenerStub.calledWith('click', onOutsideClick, true)).to.equal(true);
      });

      it('document.attachEvent is called if addEventListener is not available', () => {
        document.addEventListener = undefined;

        const wrapper = mount(<OutsideClickHandler />);
        const onOutsideClick = wrapper.instance().onOutsideClick;
        expect(document.attachEvent.calledWith('onclick', onOutsideClick)).to.equal(true);
      });
    });

    wrap()
    .withOverride(() => document, 'detachEvent', () => sinon.stub())
    .describe('#componentWillUnmount', () => {
      let removeEventListenerSpy;
      beforeEach(() => {
        removeEventListenerSpy = sinon.spy(document, 'removeEventListener');
      });

      it('document.removeEventListener is called with `click` and props.onOutsideClick', () => {
        const wrapper = mount(<OutsideClickHandler />);
        const onOutsideClick = wrapper.instance().onOutsideClick;

        wrapper.instance().componentWillUnmount();
        expect(removeEventListenerSpy.calledWith('click', onOutsideClick, true)).to.equal(true);
      });

      it('document.detachEvent is called if document.removeEventListener is not available', () => {
        document.removeEventListener = undefined;

        const wrapper = mount(<OutsideClickHandler />);
        const onOutsideClick = wrapper.instance().onOutsideClick;

        wrapper.instance().componentWillUnmount();
        expect(document.detachEvent.calledWith('onclick', onOutsideClick)).to.equal(true);
      });
    });
  });
});
