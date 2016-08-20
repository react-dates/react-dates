import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarDay, { TOUCHSTART_TIMEOUT } from '../../src/components/CalendarDay';

describe('CalendarDay', () => {
  describe('#constructor', () => {
    it('sets this.hasActiveTouchStart to false initially', () => {
      const wrapperInstance = shallow(<CalendarDay isOutsideDay />).instance();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(false);
    });
  });

  describe('#render', () => {
    it('is .CalendarDay class', () => {
      const wrapper = shallow(<CalendarDay />);
      expect(wrapper.is('.CalendarDay')).to.equal(true);
    });

    it('has .CalendarDay__day class', () => {
      const wrapper = shallow(<CalendarDay />);
      expect(wrapper.find('.CalendarDay__day')).to.have.lengthOf(1);
    });

    it('contains formatted day for single digit days', () => {
      const firstOfMonth = moment().startOf('month');
      const wrapper = shallow(<CalendarDay day={firstOfMonth} />);
      expect(wrapper.text()).to.equal(firstOfMonth.format('D'));
    });

    it('contains formatted day for double digit days', () => {
      const lastOfMonth = moment().endOf('month');
      const wrapper = shallow(<CalendarDay day={lastOfMonth} />);
      expect(wrapper.text()).to.equal(lastOfMonth.format('D'));
    });
  });

  describe('#handleDayClick', () => {
    let handleDayClickSpy;
    beforeEach(() => {
      handleDayClickSpy = sinon.spy(CalendarDay.prototype, 'handleDayClick');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by click', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('click');
      expect(handleDayClickSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayClick', () => {
      const onDayClickStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayClick={onDayClickStub} />);
      wrapper.instance().handleDayClick();
      expect(onDayClickStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleDayMouseDown', () => {
    let handleDayMouseDownSpy;
    beforeEach(() => {
      handleDayMouseDownSpy = sinon.spy(CalendarDay.prototype, 'handleDayMouseDown');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mousedown', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('mousedown');
      expect(handleDayMouseDownSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseDown', () => {
      const onMouseDownStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseDown={onMouseDownStub} />);
      wrapper.instance().handleDayMouseDown();
      expect(onMouseDownStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleDayMouseUp', () => {
    let handleDayMouseUpSpy;
    beforeEach(() => {
      handleDayMouseUpSpy = sinon.spy(CalendarDay.prototype, 'handleDayMouseUp');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseup', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('mouseup');
      expect(handleDayMouseUpSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseUp', () => {
      const onMouseUpStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseUp={onMouseUpStub} />);
      wrapper.instance().handleDayMouseUp();
      expect(onMouseUpStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleDayMouseEnter', () => {
    let handleDayMouseEnterSpy;
    beforeEach(() => {
      handleDayMouseEnterSpy = sinon.spy(CalendarDay.prototype, 'handleDayMouseEnter');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseenter', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('mouseenter');
      expect(handleDayMouseEnterSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseEnter', () => {
      const onMouseEnterStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseEnter={onMouseEnterStub} />);
      wrapper.instance().handleDayMouseEnter();
      expect(onMouseEnterStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleDayMouseLeave', () => {
    let handleDayMouseLeaveSpy;
    beforeEach(() => {
      handleDayMouseLeaveSpy = sinon.spy(CalendarDay.prototype, 'handleDayMouseLeave');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseleave', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('mouseleave');
      expect(handleDayMouseLeaveSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseLeave', () => {
      const onMouseLeaveStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseLeave={onMouseLeaveStub} />);
      wrapper.instance().handleDayMouseLeave();
      expect(onMouseLeaveStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleDayTouchStart', () => {
    let handleDayTouchStartSpy;
    let useFakeTimers;
    beforeEach(() => {
      handleDayTouchStartSpy = sinon.spy(CalendarDay.prototype, 'handleDayTouchStart');
      useFakeTimers = sinon.useFakeTimers();
    });

    it('gets triggered by touchstart', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('touchstart');
      expect(handleDayTouchStartSpy).to.have.property('callCount', 1);
    });

    it('sets this.hasActiveTouchStart to true', () => {
      const wrapperInstance = shallow(<CalendarDay />).instance();
      wrapperInstance.handleDayTouchStart();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(true);
    });

    it('sets this.hasActiveTouchStart to false after TOUCHSTART_TIMEOUT ms have passed', () => {
      const wrapperInstance = shallow(<CalendarDay />).instance();
      wrapperInstance.handleDayTouchStart();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(true);
      useFakeTimers.tick(TOUCHSTART_TIMEOUT);
      expect(wrapperInstance.hasActiveTouchStart).to.equal(false);
    });

    it('calls props.onDayTouchStart', () => {
      const onDayTouchStartStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayTouchStart={onDayTouchStartStub} />);
      wrapper.instance().handleDayTouchStart();
      expect(onDayTouchStartStub).to.have.property('callCount', 1);
    });

    afterEach(() => {
      sinon.restore();
      useFakeTimers.restore();
    });
  });

  describe('#handleDayTouchEnd', () => {
    let handleDayTouchEndSpy;
    let handleDayTouchTapSpy;
    beforeEach(() => {
      handleDayTouchEndSpy = sinon.spy(CalendarDay.prototype, 'handleDayTouchEnd');
      handleDayTouchTapSpy = sinon.spy(CalendarDay.prototype, 'handleDayTouchTap');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by touchend', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('touchend');
      expect(handleDayTouchEndSpy).to.have.property('callCount', 1);
    });

    it('calls handleDayTouchTap if this.hasActiveTouchStart', () => {
      const wrapperInstance = shallow(<CalendarDay />).instance();
      wrapperInstance.hasActiveTouchStart = true;
      wrapperInstance.handleDayTouchEnd();
      expect(handleDayTouchTapSpy).to.have.property('callCount', 1);
    });

    it('sets this.hasActiveTouchStart to false if this.hasActiveTouchStart', () => {
      const wrapperInstance = shallow(<CalendarDay />).instance();
      wrapperInstance.hasActiveTouchStart = true;
      wrapperInstance.handleDayTouchEnd();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(false);
    });

    it('does not call handleDayTouchTap if !this.hasActiveTouchStart', () => {
      const wrapperInstance = shallow(<CalendarDay />).instance();
      wrapperInstance.hasActiveTouchStart = false;
      wrapperInstance.handleDayTouchEnd();
      expect(handleDayTouchTapSpy.called).to.equal(false);
    });

    it('calls props.onDayTouchEnd', () => {
      const onDayTouchEndStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayTouchEnd={onDayTouchEndStub} />);
      wrapper.instance().handleDayTouchEnd();
      expect(onDayTouchEndStub).to.have.property('callCount', 1);
    });
  });

  describe('#handleDayTouchTap', () => {
    it('calls props.onDayTouchTap', () => {
      const onDayTouchTapStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayTouchTap={onDayTouchTapStub} />);
      wrapper.instance().handleDayTouchTap();
      expect(onDayTouchTapStub).to.have.property('callCount', 1);
    });
  });
});
