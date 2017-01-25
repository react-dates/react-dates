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

  describe('#onDayClick', () => {
    let onDayClickSpy;
    beforeEach(() => {
      onDayClickSpy = sinon.spy(CalendarDay.prototype, 'onDayClick');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by click', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('click');
      expect(onDayClickSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayClick', () => {
      const onDayClickStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayClick={onDayClickStub} />);
      wrapper.instance().onDayClick();
      expect(onDayClickStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayMouseDown', () => {
    let onDayMouseDownSpy;
    beforeEach(() => {
      onDayMouseDownSpy = sinon.spy(CalendarDay.prototype, 'onDayMouseDown');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mousedown', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('mousedown');
      expect(onDayMouseDownSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseDown', () => {
      const onMouseDownStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseDown={onMouseDownStub} />);
      wrapper.instance().onDayMouseDown();
      expect(onMouseDownStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayMouseUp', () => {
    let onDayMouseUpSpy;
    beforeEach(() => {
      onDayMouseUpSpy = sinon.spy(CalendarDay.prototype, 'onDayMouseUp');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseup', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('mouseup');
      expect(onDayMouseUpSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseUp', () => {
      const onMouseUpStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseUp={onMouseUpStub} />);
      wrapper.instance().onDayMouseUp();
      expect(onMouseUpStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayMouseEnter', () => {
    let onDayMouseEnterSpy;
    beforeEach(() => {
      onDayMouseEnterSpy = sinon.spy(CalendarDay.prototype, 'onDayMouseEnter');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseenter', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('mouseenter');
      expect(onDayMouseEnterSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseEnter', () => {
      const onMouseEnterStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseEnter={onMouseEnterStub} />);
      wrapper.instance().onDayMouseEnter();
      expect(onMouseEnterStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayMouseLeave', () => {
    let onDayMouseLeaveSpy;
    beforeEach(() => {
      onDayMouseLeaveSpy = sinon.spy(CalendarDay.prototype, 'onDayMouseLeave');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by mouseleave', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('mouseleave');
      expect(onDayMouseLeaveSpy).to.have.property('callCount', 1);
    });

    it('calls props.onDayMouseLeave', () => {
      const onMouseLeaveStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayMouseLeave={onMouseLeaveStub} />);
      wrapper.instance().onDayMouseLeave();
      expect(onMouseLeaveStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayTouchStart', () => {
    let onDayTouchStartSpy;
    let useFakeTimers;
    beforeEach(() => {
      onDayTouchStartSpy = sinon.spy(CalendarDay.prototype, 'onDayTouchStart');
      useFakeTimers = sinon.useFakeTimers();
    });

    it('gets triggered by touchstart', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('touchstart');
      expect(onDayTouchStartSpy).to.have.property('callCount', 1);
    });

    it('sets this.hasActiveTouchStart to true', () => {
      const wrapperInstance = shallow(<CalendarDay />).instance();
      wrapperInstance.onDayTouchStart();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(true);
    });

    it('sets this.hasActiveTouchStart to false after TOUCHSTART_TIMEOUT ms have passed', () => {
      const wrapperInstance = shallow(<CalendarDay />).instance();
      wrapperInstance.onDayTouchStart();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(true);
      useFakeTimers.tick(TOUCHSTART_TIMEOUT);
      expect(wrapperInstance.hasActiveTouchStart).to.equal(false);
    });

    it('calls props.onDayTouchStart', () => {
      const onDayTouchStartStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayTouchStart={onDayTouchStartStub} />);
      wrapper.instance().onDayTouchStart();
      expect(onDayTouchStartStub).to.have.property('callCount', 1);
    });

    afterEach(() => {
      sinon.restore();
      useFakeTimers.restore();
    });
  });

  describe('#onDayTouchEnd', () => {
    let onDayTouchEndSpy;
    let onDayTouchTapSpy;
    beforeEach(() => {
      onDayTouchEndSpy = sinon.spy(CalendarDay.prototype, 'onDayTouchEnd');
      onDayTouchTapSpy = sinon.spy(CalendarDay.prototype, 'onDayTouchTap');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('gets triggered by touchend', () => {
      const wrapper = shallow(<CalendarDay />);
      wrapper.simulate('touchend');
      expect(onDayTouchEndSpy).to.have.property('callCount', 1);
    });

    it('calls onDayTouchTap if this.hasActiveTouchStart', () => {
      const wrapperInstance = shallow(<CalendarDay />).instance();
      wrapperInstance.hasActiveTouchStart = true;
      wrapperInstance.onDayTouchEnd();
      expect(onDayTouchTapSpy).to.have.property('callCount', 1);
    });

    it('sets this.hasActiveTouchStart to false if this.hasActiveTouchStart', () => {
      const wrapperInstance = shallow(<CalendarDay />).instance();
      wrapperInstance.hasActiveTouchStart = true;
      wrapperInstance.onDayTouchEnd();
      expect(wrapperInstance.hasActiveTouchStart).to.equal(false);
    });

    it('does not call onDayTouchTap if !this.hasActiveTouchStart', () => {
      const wrapperInstance = shallow(<CalendarDay />).instance();
      wrapperInstance.hasActiveTouchStart = false;
      wrapperInstance.onDayTouchEnd();
      expect(onDayTouchTapSpy.called).to.equal(false);
    });

    it('calls props.onDayTouchEnd', () => {
      const onDayTouchEndStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayTouchEnd={onDayTouchEndStub} />);
      wrapper.instance().onDayTouchEnd();
      expect(onDayTouchEndStub).to.have.property('callCount', 1);
    });
  });

  describe('#onDayTouchTap', () => {
    it('calls props.onDayTouchTap', () => {
      const onDayTouchTapStub = sinon.stub();
      const wrapper = shallow(<CalendarDay onDayTouchTap={onDayTouchTapStub} />);
      wrapper.instance().onDayTouchTap();
      expect(onDayTouchTapStub).to.have.property('callCount', 1);
    });
  });
});
