import React from 'react';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import DayPickerRangeController from '../../src/components/DayPickerRangeController';

import DayPicker from '../../src/components/DayPicker';

import isInclusivelyAfterDay from '../../src/utils/isInclusivelyAfterDay';
import * as isTouchDeviceModule from '../../src/utils/isTouchDevice';

import { START_DATE, END_DATE } from '../../constants';

// Set to noon to mimic how days in the picker are configured internally
const today = moment().startOf('day').hours(12);

describe('DayPickerRangeController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#render()', () => {
    it('renders <DayPicker />', () => {
      const wrapper = shallow(<DayPickerRangeController />);
      expect(wrapper.find(DayPicker)).to.have.length(1);
    });
  });

  describe('#onDayClick', () => {
    describe('day argument is a blocked day', () => {
      it('props.onFocusChange is not called', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <DayPickerRangeController
            onFocusChange={onFocusChangeStub}
            isDayBlocked={() => true}
          />,
        );
        wrapper.instance().onDayClick(today);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });

      it('props.onDatesChange is not called', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(
          <DayPickerRangeController
            onDatesChange={onDatesChangeStub}
            isDayBlocked={() => true}
          />,
        );
        wrapper.instance().onDayClick(today);
        expect(onDatesChangeStub.callCount).to.equal(0);
      });
    });

    describe('props.focusedInput === START_DATE', () => {
      describe('props.onFocusChange', () => {
        it('is called once', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow(
            <DayPickerRangeController
              focusedInput={START_DATE}
              onFocusChange={onFocusChangeStub}
            />,
          );
          wrapper.instance().onDayClick(today);
          expect(onFocusChangeStub.callCount).to.equal(1);
        });

        it('is called with END_DATE', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow(
            <DayPickerRangeController
              focusedInput={START_DATE}
              onFocusChange={onFocusChangeStub}
            />,
          );
          wrapper.instance().onDayClick(today);
          expect(onFocusChangeStub.getCall(0).args[0]).to.equal(END_DATE);
        });
      });

      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(
          <DayPickerRangeController focusedInput={START_DATE} onDatesChange={onDatesChangeStub} />,
        );
        wrapper.instance().onDayClick(today);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      describe('arg is after props.endDate', () => {
        it('calls props.onDatesChange with startDate === arg and endDate === null', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow(
            <DayPickerRangeController
              focusedInput={START_DATE}
              endDate={today}
              onDatesChange={onDatesChangeStub}
            />,
          );
          const tomorrow = moment(today).add(1, 'days');
          wrapper.instance().onDayClick(tomorrow);
          expect(onDatesChangeStub.calledWith({
            startDate: tomorrow,
            endDate: null,
          })).to.equal(true);
        });
      });

      describe('arg is before props.endDate', () => {
        it('calls props.onDatesChange with startDate === arg and endDate === props.endDate', () => {
          const onDatesChangeStub = sinon.stub();
          const tomorrow = moment(today).add(1, 'days');
          const wrapper = shallow(
            <DayPickerRangeController
              focusedInput={START_DATE}
              endDate={tomorrow}
              onDatesChange={onDatesChangeStub}
            />,
          );
          wrapper.instance().onDayClick(today);
          expect(onDatesChangeStub.calledWith({
            startDate: today,
            endDate: tomorrow,
          })).to.equal(true);
        });
      });

      describe('props.endDate is null', () => {
        it('calls props.onDatesChange with startDate === arg and endDate === null', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow(
            <DayPickerRangeController
              focusedInput={START_DATE}
              endDate={null}
              onDatesChange={onDatesChangeStub}
            />,
          );
          wrapper.instance().onDayClick(today);
          expect(onDatesChangeStub.calledWith({
            startDate: today,
            endDate: null,
          })).to.equal(true);
        });
      });
    });

    describe('props.focusedInput === END_DATE', () => {
      describe('arg is before props.startDate', () => {
        it('calls props.onDatesChange with startDate === arg and endDate === null', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow(
            <DayPickerRangeController
              focusedInput={END_DATE}
              startDate={moment(today).add(1, 'days')}
              onDatesChange={onDatesChangeStub}
            />,
          );
          wrapper.instance().onDayClick(today);
          const args = onDatesChangeStub.getCall(0).args[0];
          expect(args.startDate).to.equal(today);
          expect(args.endDate).to.equal(null);
        });
      });

      describe('arg is not before props.startDate', () => {
        it('calls props.onDatesChange with startDate === props.startDate and endDate === arg',
          () => {
            const onDatesChangeStub = sinon.stub();
            const wrapper = shallow(
              <DayPickerRangeController
                focusedInput={END_DATE}
                onDatesChange={onDatesChangeStub}
              />,
            );
            wrapper.instance().onDayClick(today);
            const args = onDatesChangeStub.getCall(0).args[0];
            expect(args.startDate).to.equal(wrapper.props().startDate);
            expect(args.endDate).to.equal(today);
          },
        );

        describe('props.onFocusChange', () => {
          describe('props.startDate === null', () => {
            it('is called once', () => {
              const onFocusChangeStub = sinon.stub();
              const wrapper = shallow(
                <DayPickerRangeController
                  focusedInput={END_DATE}
                  onFocusChange={onFocusChangeStub}
                />,
              );
              wrapper.instance().onDayClick(today);
              expect(onFocusChangeStub.callCount).to.equal(1);
            });

            it('is called with START_DATE', () => {
              const onFocusChangeStub = sinon.stub();
              const wrapper = shallow(
                <DayPickerRangeController
                  focusedInput={END_DATE}
                  onFocusChange={onFocusChangeStub}
                />,
              );
              wrapper.instance().onDayClick(today);
              expect(onFocusChangeStub.getCall(0).args[0]).to.equal(START_DATE);
            });
          });

          describe('props.startDate is truthy', () => {
            it('is called once', () => {
              const onFocusChangeStub = sinon.stub();
              const wrapper = shallow(
                <DayPickerRangeController
                  focusedInput={END_DATE}
                  startDate={today}
                  onFocusChange={onFocusChangeStub}
                />,
              );
              wrapper.instance().onDayClick(moment(today).add(1, 'days'));
              expect(onFocusChangeStub.callCount).to.equal(1);
            });

            it('is called with null', () => {
              const onFocusChangeStub = sinon.stub();
              const wrapper = shallow(
                <DayPickerRangeController
                  focusedInput={END_DATE}
                  startDate={today}
                  onFocusChange={onFocusChangeStub}
                />,
              );
              wrapper.instance().onDayClick(moment(today).add(1, 'days'));
              expect(onFocusChangeStub.getCall(0).args[0]).to.equal(null);
            });
          });
        });

        describe('props.onClose', () => {
          describe('props.startDate is truthy', () => {
            it('is called with startDate and endDate', () => {
              const onCloseStub = sinon.stub();
              const wrapper = shallow(
                <DayPickerRangeController
                  focusedInput={END_DATE}
                  startDate={today}
                  onClose={onCloseStub}
                />,
              );

              const endDate = moment(today).add(1, 'days');

              wrapper.instance().onDayClick(endDate);
              const args = onCloseStub.getCall(0).args[0];
              expect(args.startDate).to.equal(today);
              expect(args.endDate).to.equal(endDate);
            });
          });
        });
      });

      describe('minimumNights is 0', () => {
        it('calls props.onDatesChange with startDate === today and endDate === today',
          () => {
            const onDatesChangeStub = sinon.stub();
            const wrapper = shallow(
              <DayPickerRangeController
                focusedInput={END_DATE}
                minimumNights={0}
                onDatesChange={onDatesChangeStub}
                startDate={today}
              />,
            );
            wrapper.instance().onDayClick(today);
            const args = onDatesChangeStub.getCall(0).args[0];
            expect(args.startDate).to.equal(today);
            expect(args.endDate).to.equal(today);
          });
      });
    });
  });

  describe('#onDayMouseEnter', () => {
    it('sets state.hoverDate to the day arg', () => {
      const wrapper = shallow(<DayPickerRangeController />);
      wrapper.instance().onDayMouseEnter(today);
      expect(wrapper.state().hoverDate).to.equal(today);
    });
  });

  describe('#onDayMouseLeave', () => {
    it('sets state.hoverDate to null', () => {
      const wrapper = shallow(<DayPickerRangeController />);
      wrapper.setState({
        hoverDate: today,
      });
      wrapper.instance().onDayMouseLeave(today);
      expect(wrapper.state().hoverDate).to.equal(null);
    });
  });

  describe('#getFirstFocusableDay', () => {
    describe('focusedInput === START_DATE', () => {
      it('returns startDate if exists and is not blocked', () => {
        sinon.stub(DayPickerRangeController.prototype, 'isBlocked').returns(false);
        const wrapper = shallow(
          <DayPickerRangeController
            focusedInput={START_DATE}
            startDate={today}
            onFocusChange={sinon.stub()}
            onDatesChange={sinon.stub()}
          />,
        );
        const firstFocusableDay = wrapper.instance().getFirstFocusableDay(moment().subtract(10, 'days'));
        expect(firstFocusableDay.isSame(today, 'day')).to.equal(true);
      });

      it('returns first day of arg month if startDate is falsey', () => {
        sinon.stub(DayPickerRangeController.prototype, 'isBlocked').returns(false);
        const wrapper = shallow(
          <DayPickerRangeController
            focusedInput={START_DATE}
            startDate={null}
            onFocusChange={sinon.stub()}
            onDatesChange={sinon.stub()}
          />,
        );
        const startOfMonth = today.clone().startOf('month');
        const firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        expect(firstFocusableDay.isSame(startOfMonth, 'day')).to.equal(true);
      });
    });

    describe('focusedInput === END_DATE', () => {
      it('returns endDate if exists and is not blocked and startDate is falsey', () => {
        sinon.stub(DayPickerRangeController.prototype, 'isBlocked').returns(false);
        const endDate = moment().add(10, 'days');
        const wrapper = shallow(
          <DayPickerRangeController
            focusedInput={END_DATE}
            startDate={null}
            endDate={endDate}
            onFocusChange={sinon.stub()}
            onDatesChange={sinon.stub()}
          />,
        );
        const firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        expect(firstFocusableDay.isSame(endDate, 'day')).to.equal(true);
      });

      it('returns startDate + minimumNights if startDate is truthy and endDate is not', () => {
        sinon.stub(DayPickerRangeController.prototype, 'isBlocked').returns(false);
        const startDate = moment().add(10, 'days');
        const minimumNights = 5;
        const wrapper = shallow(
          <DayPickerRangeController
            focusedInput={END_DATE}
            startDate={startDate}
            minimumNights={minimumNights}
            onFocusChange={sinon.stub()}
            onDatesChange={sinon.stub()}
          />,
        );
        const firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        expect(firstFocusableDay.isSame(startDate.clone().add(minimumNights, 'days'), 'day')).to.equal(true);
      });

      it('returns first day of arg month if startDate and endDate are falsey', () => {
        sinon.stub(DayPickerRangeController.prototype, 'isBlocked').returns(false);
        const wrapper = shallow(
          <DayPickerRangeController
            focusedInput={END_DATE}
            startDate={null}
            minimumNights={null}
            onFocusChange={sinon.stub()}
            onDatesChange={sinon.stub()}
          />,
        );
        const firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        expect(firstFocusableDay.isSame(today.clone().startOf('month'), 'day')).to.equal(true);
      });
    });

    describe('desired day is blocked', () => {
      it('returns next unblocked visible day after desired day if exists', () => {
        const isBlockedStub = sinon.stub(DayPickerRangeController.prototype, 'isBlocked').returns(true);
        isBlockedStub.onCall(8).returns(false);

        const startDate = moment().endOf('month').subtract(10, 'days');
        const wrapper = shallow(
          <DayPickerRangeController
            focusedInput={END_DATE}
            startDate={startDate}
            numberOfMonths={1}
            onFocusChange={sinon.stub()}
            onDatesChange={sinon.stub()}
          />,
        );
        const firstFocusableDay = wrapper.instance().getFirstFocusableDay(today);
        expect(firstFocusableDay.isSame(startDate.clone().add(9, 'days'), 'day')).to.equal(true);
      });
    });
  });

  describe('day modifier methods', () => {
    describe('#doesNotMeetMinimumNights', () => {
      const MIN_NIGHTS = 3;
      describe('state.startDate !== null', () => {
        const startDate = moment(today).add(3, 'days'); // rand day not equal to today
        describe('props.focusedInput === END_DATE', () => {
          it('returns true if arg is < props.minimumNights after props.startDate', () => {
            const testDate = moment(startDate).add(MIN_NIGHTS - 1, 'days');
            const wrapper = shallow(
              <DayPickerRangeController
                focusedInput={END_DATE}
                startDate={startDate}
                minimumNights={MIN_NIGHTS}
              />,
            );
            expect(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(true);
          });

          it('returns false if arg is > props.minimumNights after props.startDate', () => {
            const testDate = moment(startDate).add(MIN_NIGHTS + 1, 'days');
            const wrapper = shallow(
              <DayPickerRangeController
                focusedInput={END_DATE}
                startDate={startDate}
                minimumNights={MIN_NIGHTS}
              />,
            );
            expect(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });

          it('handles time differences of less than 1 full day properly', () => {
            const partialDate = moment(startDate).add(5, 'minutes');
            const testDate = moment(startDate).add(MIN_NIGHTS, 'days');
            const wrapper = shallow(
              <DayPickerRangeController
                focusedInput={END_DATE}
                startDate={partialDate}
                minimumNights={MIN_NIGHTS}
              />,
            );
            expect(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
        });

        describe('props.focusedInput !== END_DATE', () => {
          it('returns false', () => {
            const testDate = moment(startDate).add(MIN_NIGHTS - 1, 'days');
            const wrapper = shallow(
              <DayPickerRangeController
                focusedInput={START_DATE}
                startDate={startDate}
                minimumNights={MIN_NIGHTS}
              />,
            );
            expect(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
        });
      });

      describe('props.startDate === null', () => {
        describe('props.focusedInput === END_DATE', () => {
          it('returns true if arg - props.minimumNights is outside allowed range', () => {
            const isOutsideRange = day => !isInclusivelyAfterDay(day, today);
            const testDate = moment(today).add(MIN_NIGHTS - 1, 'days');
            const wrapper = shallow(
              <DayPickerRangeController
                focusedInput={END_DATE}
                startDate={null}
                minimumNights={MIN_NIGHTS}
                isOutsideRange={isOutsideRange}
              />,
            );
            expect(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(true);
          });

          it('returns false if arg - props.minimumNights is inside allowed range', () => {
            const isOutsideRange = day => !isInclusivelyAfterDay(day, today);
            const testDate = moment(today).add(MIN_NIGHTS, 'days');
            const wrapper = shallow(
              <DayPickerRangeController
                focusedInput={END_DATE}
                startDate={null}
                minimumNights={MIN_NIGHTS}
                isOutsideRange={isOutsideRange}
              />,
            );
            expect(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
        });

        describe('state.focusedInput !== END_DATE', () => {
          it('returns false', () => {
            const testDate = moment(today).add(MIN_NIGHTS - 1, 'days');
            const wrapper = shallow(
              <DayPickerRangeController
                focusedInput={START_DATE}
                startDate={null}
                minimumNights={MIN_NIGHTS}
              />,
            );
            expect(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
        });
      });
    });

    describe('#isDayAfterHoveredStartDate', () => {
      it('returns true if arg startDate is hovered and arg is the day after the startDate', () => {
        const wrapper = shallow(<DayPickerRangeController startDate={today} />);
        wrapper.setState({
          hoverDate: today,
        });
        const testDate = moment(today).add(1, 'days');
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(true);
      });

      it('returns false if props.startDate is falsey', () => {
        const testDate = moment(today).add(1, 'days');
        const wrapper = shallow(<DayPickerRangeController startDate={null} />);
        wrapper.setState({
          hoverDate: today,
        });
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });

      it('returns false if props.endDate is truthy', () => {
        const testDate = moment(today).add(1, 'days');
        const wrapper = shallow(
          <DayPickerRangeController
            startDate={today}
            endDate={moment(today).add(3, 'days')}
          />,
        );
        wrapper.setState({
          hoverDate: today,
        });
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });

      it('returns false if arg is not day after state.hoverDate', () => {
        const wrapper = shallow(<DayPickerRangeController startDate={today} />);
        wrapper.setState({
          hoverDate: today,
        });
        const testDate = moment(today).add(2, 'days');
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });

      it('returns false if state.hoverDate is not the same as props.startDate', () => {
        const testDate = moment(today).add(1, 'days');
        const wrapper = shallow(<DayPickerRangeController startDate={today} />);
        wrapper.setState({
          hoverDate: testDate,
        });
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });

      it('returns false if arg is day after state.hoverDate and props.minimumNights is 0', () => {
        const testDate = moment(today).add(1, 'days');
        const wrapper = shallow(<DayPickerRangeController startDate={today} minimumNights={0} />);
        wrapper.setState({
          hoverDate: today,
        });
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });
    });

    describe('#isEndDate', () => {
      it('returns true if arg === props.endDate', () => {
        const wrapper = shallow(<DayPickerRangeController endDate={today} />);
        expect(wrapper.instance().isEndDate(today)).to.equal(true);
      });

      it('returns false if arg !== props.endDate', () => {
        const wrapper =
          shallow(<DayPickerRangeController endDate={moment(today).add(1, 'days')} />);
        expect(wrapper.instance().isEndDate(today)).to.equal(false);
      });
    });

    describe('#isHovered', () => {
      it('returns true if arg === state.hoverDate', () => {
        const wrapper = shallow(<DayPickerRangeController />);
        wrapper.setState({
          hoverDate: today,
        });
        expect(wrapper.instance().isHovered(today)).to.equal(true);
      });

      it('returns false if arg !== state.hoverDate', () => {
        const wrapper = shallow(<DayPickerRangeController />);
        wrapper.setState({
          hoverDate: moment(today).add(1, 'days'),
        });
        expect(wrapper.instance().isHovered(today)).to.equal(false);
      });
    });

    describe('#isInHoveredSpan', () => {
      describe('props.endDate === null', () => {
        it('returns true if arg is in between props.startDate and state.hoverDate', () => {
          const HOVER_DATE_DIFF = 5;
          const wrapper = shallow(<DayPickerRangeController startDate={today} endDate={null} />);
          wrapper.setState({
            hoverDate: moment(today).add(HOVER_DATE_DIFF, 'days'),
          });
          const testDate = moment(today).add(HOVER_DATE_DIFF - 1, 'days');
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(true);
        });

        it('returns true if arg is equal to state.hoverDate', () => {
          const testDate = moment(today).add(3, 'days');
          const wrapper = shallow(<DayPickerRangeController startDate={today} endDate={null} />);
          wrapper.setState({
            hoverDate: testDate,
          });
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(true);
        });

        it('returns false if arg is < props.startDate', () => {
          const wrapper = shallow(<DayPickerRangeController startDate={today} endDate={null} />);
          wrapper.setState({
            hoverDate: moment(today).add(3, 'days'),
          });
          const testDate = moment(today).subtract(1, 'days');
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(false);
        });

        it('returns false if arg is > state.hoverDate', () => {
          const hoverDate = moment(today).add(3, 'days');
          const wrapper = shallow(<DayPickerRangeController startDate={today} endDate={null} />);
          wrapper.setState({
            hoverDate,
          });
          const testDate = moment(hoverDate).add(1, 'days');
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(false);
        });
      });

      describe('props.startDate === null', () => {
        it('returns true if arg is in between state.hoverDate and props.endDate', () => {
          const endDate = moment(today).add(5, 'days');
          const wrapper = shallow(
            <DayPickerRangeController
              startDate={null}
              endDate={moment(today).add(5, 'days')}
            />,
          );
          wrapper.setState({
            hoverDate: today,
          });
          const testDate = moment(endDate).subtract(1, 'days');
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(true);
        });

        it('returns true if arg is equal to state.hoverDate', () => {
          const wrapper = shallow(
            <DayPickerRangeController
              startDate={null}
              endDate={moment(today).add(5, 'days')}
            />,
          );
          wrapper.setState({
            hoverDate: today,
          });
          expect(wrapper.instance().isInHoveredSpan(today)).to.equal(true);
        });

        it('returns false if arg is < state.hoverDate', () => {
          const wrapper = shallow(
            <DayPickerRangeController
              startDate={null}
              endDate={moment(today).add(5, 'days')}
            />,
          );
          wrapper.setState({
            hoverDate: today,
          });
          const testDate = moment(today).subtract(1, 'days');
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(false);
        });

        it('returns false if arg is > props.endDate', () => {
          const endDate = moment(today).add(5, 'days');
          const wrapper = shallow(
            <DayPickerRangeController
              startDate={null}
              endDate={endDate}
            />,
          );
          wrapper.setState({
            hoverDate: today,
          });
          const testDate = moment(endDate).add(1, 'days');
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(false);
        });
      });
    });

    describe('#isInSelectedSpan', () => {
      it('returns true if props.startDate < arg < props.endDate', () => {
        const endDate = moment(today).add(5, 'days');
        const wrapper = shallow(
          <DayPickerRangeController
            startDate={today}
            endDate={endDate}
          />,
        );
        const testDate = moment(endDate).subtract(1, 'days');
        expect(wrapper.instance().isInSelectedSpan(testDate)).to.equal(true);
      });

      it('returns false if arg < props.startDate', () => {
        const endDate = moment(today).add(5, 'days');
        const wrapper = shallow(
          <DayPickerRangeController
            startDate={today}
            endDate={endDate}
          />,
        );
        const testDate = moment(today).subtract(1, 'days');
        expect(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });

      it('returns false if arg > props.endDate', () => {
        const endDate = moment(today).add(5, 'days');
        const wrapper = shallow(
          <DayPickerRangeController
            startDate={today}
            endDate={endDate}
          />,
        );
        const testDate = moment(endDate).add(1, 'days');
        expect(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });

      it('returns false if props.startDate === null', () => {
        const wrapper = shallow(
          <DayPickerRangeController
            startDate={null}
            endDate={moment(today).add(5, 'days')}
          />,
        );
        expect(wrapper.instance().isInSelectedSpan(today)).to.equal(false);
      });

      it('returns false if props.endDate === null', () => {
        const wrapper = shallow(
          <DayPickerRangeController
            startDate={today}
            endDate={null}
          />,
        );
        const testDate = moment(today).add(1, 'days');
        expect(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });
    });

    describe('#isLastInRange', () => {
      let isInSelectedSpanStub;
      beforeEach(() => {
        isInSelectedSpanStub = sinon.stub(DayPickerRangeController.prototype, 'isInSelectedSpan');
      });

      it('returns true if arg is day before props.endDate and is in the selected span', () => {
        isInSelectedSpanStub.returns(true);
        const wrapper = shallow(
          <DayPickerRangeController
            endDate={moment(today).add(1, 'days')}
          />,
        );
        expect(wrapper.instance().isLastInRange(today)).to.equal(true);
      });

      it('returns false if arg is not in the selected span', () => {
        isInSelectedSpanStub.returns(false);
        const wrapper = shallow(
          <DayPickerRangeController
            endDate={moment(today).add(1, 'days')}
          />,
        );
        expect(wrapper.instance().isLastInRange(today)).to.equal(false);
      });

      it('returns false if arg is not the day before props.endDate', () => {
        isInSelectedSpanStub.returns(true);
        const wrapper = shallow(
          <DayPickerRangeController
            endDate={moment(today).add(2, 'days')}
          />,
        );
        expect(wrapper.instance().isLastInRange(today)).to.equal(false);
      });
    });

    describe('#isStartDate', () => {
      it('returns true if arg === props.startDate', () => {
        const wrapper = shallow(<DayPickerRangeController startDate={today} />);
        expect(wrapper.instance().isStartDate(today)).to.equal(true);
      });

      it('returns false if arg !== props.startDate', () => {
        const wrapper =
          shallow(<DayPickerRangeController startDate={moment(today).add(1, 'days')} />);
        expect(wrapper.instance().isStartDate(today)).to.equal(false);
      });
    });

    describe('#isBlocked', () => {
      let isDayBlockedStub;
      let isOutsideRangeStub;
      let doesNotMeetMinimumNightsStub;
      beforeEach(() => {
        isDayBlockedStub = sinon.stub();
        isOutsideRangeStub = sinon.stub();
        doesNotMeetMinimumNightsStub =
          sinon.stub(DayPickerRangeController.prototype, 'doesNotMeetMinimumNights');
      });

      it('returns true if arg is calendar blocked', () => {
        isDayBlockedStub.returns(true);
        isOutsideRangeStub.returns(false);
        doesNotMeetMinimumNightsStub.returns(false);

        const wrapper = shallow(
          <DayPickerRangeController
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />,
        );
        expect(wrapper.instance().isBlocked(today)).to.equal(true);
      });

      it('returns true if arg is out of range', () => {
        isDayBlockedStub.returns(false);
        isOutsideRangeStub.returns(true);
        doesNotMeetMinimumNightsStub.returns(false);

        const wrapper = shallow(
          <DayPickerRangeController
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />,
        );
        expect(wrapper.instance().isBlocked(today)).to.equal(true);
      });

      it('returns true if arg does not meet minimum nights', () => {
        isDayBlockedStub.returns(false);
        isOutsideRangeStub.returns(false);
        doesNotMeetMinimumNightsStub.returns(true);

        const wrapper = shallow(
          <DayPickerRangeController
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />,
        );
        expect(wrapper.instance().isBlocked(today)).to.equal(true);
      });

      it('returns false if arg is not blocked, not out of range, and meets minimum nights', () => {
        isDayBlockedStub.returns(false);
        isOutsideRangeStub.returns(false);
        doesNotMeetMinimumNightsStub.returns(false);

        const wrapper = shallow(
          <DayPickerRangeController
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />,
        );
        expect(wrapper.instance().isBlocked(today)).to.equal(false);
      });
    });

    describe('#isToday', () => {
      it('returns true if today', () => {
        const wrapper = shallow(<DayPickerRangeController />);
        expect(wrapper.instance().isToday(today)).to.equal(true);
      });

      it('returns false if tomorrow', () => {
        const wrapper = shallow(<DayPickerRangeController />);
        expect(wrapper.instance().isToday(moment(today).add(1, 'days'))).to.equal(false);
      });

      it('returns false if last month', () => {
        const wrapper = shallow(<DayPickerRangeController />);
        expect(wrapper.instance().isToday(moment(today).subtract(1, 'months'))).to.equal(false);
      });
    });
  });

  describe('modifier optimization', () => {
    it('includes hover modifiers for non-touch device', () => {
      sinon.stub(isTouchDeviceModule, 'default').returns(false);

      const wrapper = shallow(<DayPickerRangeController />);

      const modifiers = wrapper.find(DayPicker).prop('modifiers');
      expect(modifiers).to.include.keys('hovered');
      expect(modifiers).to.include.keys('hovered-span');
      expect(modifiers).to.include.keys('after-hovered-start');
    });

    it('excludes hover modifiers for touch device', () => {
      sinon.stub(isTouchDeviceModule, 'default').returns(true);

      const wrapper = shallow(<DayPickerRangeController />);

      const modifiers = wrapper.find(DayPicker).prop('modifiers');
      expect(modifiers).to.not.include.keys('hovered');
      expect(modifiers).to.not.include.keys('hovered-span');
      expect(modifiers).to.not.include.keys('after-hovered-start');
    });

    it('includes start modifiers when startDate is set', () => {
      const wrapper = shallow(<DayPickerRangeController startDate={moment()} />);

      const modifiers = wrapper.find(DayPicker).prop('modifiers');
      expect(modifiers).to.include.keys('selected-start');
    });

    it('excludes start modifiers when startDate is unset', () => {
      const wrapper = shallow(<DayPickerRangeController />);

      const modifiers = wrapper.find(DayPicker).prop('modifiers');
      expect(modifiers).to.not.include.keys('selected-start');
    });

    it('includes end modifiers when endDate is set', () => {
      const wrapper = shallow(<DayPickerRangeController endDate={moment()} />);

      const modifiers = wrapper.find(DayPicker).prop('modifiers');
      expect(modifiers).to.include.keys('selected-end');
      expect(modifiers).to.include.keys('blocked-minimum-nights');
    });

    it('excludes end modifiers when endDate is unset', () => {
      const wrapper = shallow(<DayPickerRangeController />);

      const modifiers = wrapper.find(DayPicker).prop('modifiers');
      expect(modifiers).to.not.include.keys('selected-end');
      expect(modifiers).to.not.include.keys('blocked-minimum-nights');
    });

    it('includes start/end modifiers when both set', () => {
      const wrapper = shallow(
        <DayPickerRangeController
          startDate={moment()}
          endDate={moment().add(1, 'days')}
        />,
      );

      const modifiers = wrapper.find(DayPicker).prop('modifiers');
      expect(modifiers).to.include.keys('selected-span');
      expect(modifiers).to.include.keys('last-in-range');
    });

    it('excludes start/end modifiers when both unset', () => {
      const wrapper = shallow(<DayPickerRangeController />);

      const modifiers = wrapper.find(DayPicker).prop('modifiers');
      expect(modifiers).to.not.include.keys('selected-span');
      expect(modifiers).to.not.include.keys('last-in-range');
    });
  });
});
