import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { mount, shallow } from 'enzyme';

import DayPicker from '../../src/components/DayPicker';
import CalendarMonthGrid from '../../src/components/CalendarMonthGrid';
import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../src/constants';

describe('DayPicker', () => {
  describe('#render', () => {
    describe('#renderNavigation', () => {
      it('.DayPicker__nav class exists', () => {
        const wrapper = shallow(<DayPicker />);
        expect(wrapper.find('.DayPicker__nav')).to.have.lengthOf(1);
      });

      describe('prev month button', () => {
        it('has .DayPicker__nav--prev class', () => {
          const wrapper = shallow(<DayPicker />);
          expect(wrapper.find('.DayPicker__nav--prev')).to.have.lengthOf(1);
        });
      });

      describe('next month button', () => {
        it('.DayPicker__nav--next class exists', () => {
          const wrapper = shallow(<DayPicker />);
          expect(wrapper.find('.DayPicker__nav--next')).to.have.lengthOf(1);
        });
      });
    });

    describe('renderWeekHeader', () => {
      it('there are 7 elements on each .DayPicker__week-header class', () => {
        const wrapper = shallow(<DayPicker />);
        const weekHeaders = wrapper.find('.DayPicker__week-header');
        weekHeaders.forEach((weekHeader) => {
          expect(weekHeader.find('li')).to.have.lengthOf(7);
        });
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('props.numberOfMonths .DayPicker__week-header elements exists', () => {
          const NUM_OF_MONTHS = 3;
          const wrapper = shallow(
            <DayPicker orientation={HORIZONTAL_ORIENTATION} numberOfMonths={NUM_OF_MONTHS} />
          );
          expect(wrapper.find('.DayPicker__week-header')).to.have.lengthOf(NUM_OF_MONTHS);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('1 .DayPicker__week-header element exists', () => {
          const wrapper = shallow(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          expect(wrapper.find('.DayPicker__week-header')).to.have.lengthOf(1);
        });
      });
    });

    describe('transitionContainer', () => {
      it('.transition-container class exists', () => {
        const wrapper = shallow(<DayPicker />);
        expect(wrapper.find('.transition-container')).to.have.lengthOf(1);
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('.transition-container--horizontal class exists', () => {
          const wrapper = shallow(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(wrapper.find('.transition-container--horizontal')).to.have.lengthOf(1);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('.transition-container--vertical class exists', () => {
          const wrapper = shallow(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          expect(wrapper.find('.transition-container--vertical')).to.have.lengthOf(1);
        });
      });
    });

    describe('CalendarMonthGrid', () => {
      it('component exists', () => {
        const wrapper = shallow(<DayPicker />);
        expect(wrapper.find(CalendarMonthGrid)).to.have.lengthOf(1);
      });

      describe('prop.isAnimating', () => {
        beforeEach(() => {
          sinon.stub(DayPicker.prototype, 'adjustDayPickerHeight');
          sinon.stub(DayPicker.prototype, 'updateStateAfterMonthTransition');
        });

        it('is true if state.monthTransition is truthy', () => {
          const wrapper = shallow(<DayPicker />);
          wrapper.setState({ monthTransition: 'foo' });
          const CalendarMonthGridComponent = wrapper.find(CalendarMonthGrid);
          expect(CalendarMonthGridComponent.prop('isAnimating')).to.equal(true);
        });

        it('is false if state.monthTransition is falsey', () => {
          const wrapper = shallow(<DayPicker />);
          wrapper.setState({ monthTransition: null });
          const CalendarMonthGridComponent = wrapper.find(CalendarMonthGrid);
          expect(CalendarMonthGridComponent.prop('isAnimating')).to.equal(false);
        });
      });
    });
  });

  describe('#isHorizontal', () => {
    it('returns true if props.orientation === HORIZONTAL_ORIENTATION', () => {
      const wrapper = shallow(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.instance().isHorizontal()).to.equal(true);
    });

    it('returns false if props.orientation === VERTICAL_ORIENTATION', () => {
      const wrapper = shallow(<DayPicker orientation={VERTICAL_ORIENTATION} />);
      expect(wrapper.instance().isHorizontal()).to.equal(false);
    });
  });

  describe('#isVertical', () => {
    it('returns true if props.orientation === VERTICAL_ORIENTATION', () => {
      const wrapper = shallow(<DayPicker orientation={VERTICAL_ORIENTATION} />);
      expect(wrapper.instance().isVertical()).to.equal(true);
    });

    it('returns false if props.orientation === HORIZONTAL_ORIENTATION', () => {
      const wrapper = shallow(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.instance().isVertical()).to.equal(false);
    });
  });

  describe('#handlePrevMonthClick', () => {
    let translateFirstDayPickerForAnimationSpy;
    beforeEach(() => {
      translateFirstDayPickerForAnimationSpy =
        sinon.stub(DayPicker.prototype, 'translateFirstDayPickerForAnimation');
      sinon.stub(DayPicker.prototype, 'adjustDayPickerHeight');
      sinon.stub(DayPicker.prototype, 'updateStateAfterMonthTransition');
    });

    describe('interactions', () => {
      let handlePrevMonthClickSpy;
      beforeEach(() => {
        handlePrevMonthClickSpy = sinon.spy(DayPicker.prototype, 'handlePrevMonthClick');
      });

      it('is triggered by prev month button click', () => {
        const prevMonthButton = shallow(<DayPicker />).find('.DayPicker__nav--prev');
        prevMonthButton.simulate('click');
        expect(handlePrevMonthClickSpy).to.have.property('callCount', 1);
      });
    });

    it('calls props.onPrevMonthClick', () => {
      const onPrevMonthClickSpy = sinon.stub();
      const wrapper = shallow(<DayPicker onPrevMonthClick={onPrevMonthClickSpy} />);
      wrapper.instance().handlePrevMonthClick();
      expect(onPrevMonthClickSpy).to.have.property('callCount', 1);
    });

    it('calls translateFirstDayPickerForAnimation', () => {
      const wrapper = shallow(<DayPicker />);
      wrapper.instance().handlePrevMonthClick();
      expect(translateFirstDayPickerForAnimationSpy).to.have.property('callCount', 1);
    });

    it('sets state.monthTransition to "prev"', () => {
      const wrapper = shallow(<DayPicker />);
      wrapper.instance().handlePrevMonthClick();
      expect(wrapper.state().monthTransition).to.equal('prev');
    });
  });

  describe('#handleNextMonthClick', () => {
    beforeEach(() => {
      sinon.stub(DayPicker.prototype, 'adjustDayPickerHeight');
      sinon.stub(DayPicker.prototype, 'updateStateAfterMonthTransition');
    });

    describe('interactions', () => {
      let handleNextMonthClickSpy;
      beforeEach(() => {
        handleNextMonthClickSpy = sinon.spy(DayPicker.prototype, 'handleNextMonthClick');
      });

      it('is triggered by prev month button click', () => {
        const nextMonthButton = shallow(<DayPicker />).find('.DayPicker__nav--next');
        nextMonthButton.simulate('click');
        expect(handleNextMonthClickSpy).to.have.property('callCount', 1);
      });
    });

    it('calls props.onNextMonthClick', () => {
      const onNextMonthClickSpy = sinon.stub();
      const wrapper = shallow(<DayPicker onNextMonthClick={onNextMonthClickSpy} />);
      wrapper.instance().handleNextMonthClick();
      expect(onNextMonthClickSpy).to.have.property('callCount', 1);
    });

    it('sets state.monthTransition to "next"', () => {
      const wrapper = shallow(<DayPicker />);
      wrapper.instance().handleNextMonthClick();
      expect(wrapper.state().monthTransition).to.equal('next');
    });
  });

  describe.skip('life cycle methods', () => {
    let adjustDayPickerHeightSpy;
    let initializeDayPickerWidthSpy;
    beforeEach(() => {
      adjustDayPickerHeightSpy = sinon.stub(DayPicker.prototype, 'adjustDayPickerHeight');
      initializeDayPickerWidthSpy = sinon.stub(DayPicker.prototype, 'initializeDayPickerWidth');
    });

    describe('#componentDidMount', () => {
      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('calls adjustDayPickerHeight', () => {
          mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(adjustDayPickerHeightSpy).to.have.property('callCount', 1);
        });

        it('calls initializeDayPickerWidth', () => {
          mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          expect(initializeDayPickerWidthSpy).to.have.property('callCount', 1);
        });
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('does not call adjustDayPickerHeight', () => {
          mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          expect(adjustDayPickerHeightSpy.called).to.equal(false);
        });

        it('does not call initializeDayPickerWidth', () => {
          mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          expect(initializeDayPickerWidthSpy.called).to.equal(false);
        });
      });
    });

    describe('#componentDidUpdate', () => {
      let updateStateAfterMonthTransitionSpy;
      beforeEach(() => {
        updateStateAfterMonthTransitionSpy = sinon.stub(
          DayPicker.prototype,
          'updateStateAfterMonthTransition'
        );
      });

      describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
        it('calls adjustDayPickerHeight if state.monthTransition is truthy', () => {
          const wrapper = mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: 'foo',
          });
          expect(adjustDayPickerHeightSpy).to.have.property('callCount', 2);
        });

        it('does not call adjustDayPickerHeight if state.monthTransition is falsey', () => {
          const wrapper = mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: null,
          });
          expect(adjustDayPickerHeightSpy.calledTwice).to.equal(false);
        });

        it('calls updateStateAfterMonthTransition if state.monthTransition is truthy', () => {
          const wrapper = mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: 'foo',
          });
          expect(updateStateAfterMonthTransitionSpy).to.have.property('callCount', 1);
        });

        it('does not call updateStateAfterMonthTransition if state.monthTransition is falsey',
          () => {
            const wrapper = mount(<DayPicker orientation={HORIZONTAL_ORIENTATION} />);
            wrapper.setState({
              monthTransition: null,
            });
            expect(updateStateAfterMonthTransitionSpy.calledOnce).to.equal(false);
          }
        );
      });

      describe('props.orientation === VERTICAL_ORIENTATION', () => {
        it('does not call adjustDayPickerHeight if state.monthTransition is truthy', () => {
          const wrapper = mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: 'foo',
          });
          expect(adjustDayPickerHeightSpy.called).to.equal(false);
        });

        it('does not call adjustDayPickerHeight if state.monthTransition is falsey', () => {
          const wrapper = mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: null,
          });
          expect(adjustDayPickerHeightSpy.called).to.equal(false);
        });

        it('calls updateStateAfterMonthTransition if state.monthTransition is truthy', () => {
          const wrapper = mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
          wrapper.setState({
            monthTransition: 'foo',
          });
          expect(updateStateAfterMonthTransitionSpy).to.have.property('callCount', 1);
        });

        it('does not call updateStateAfterMonthTransition if state.monthTransition is falsey',
          () => {
            const wrapper = mount(<DayPicker orientation={VERTICAL_ORIENTATION} />);
            wrapper.setState({
              monthTransition: null,
            });
            expect(updateStateAfterMonthTransitionSpy.calledOnce).to.equal(false);
          }
        );
      });
    });
  });
});
