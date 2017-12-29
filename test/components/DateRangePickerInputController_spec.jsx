import React from 'react';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import DateRangePickerInputController
  from '../../src/components/DateRangePickerInputController';

import DateRangePickerInput from '../../src/components/DateRangePickerInput';

import isSameDay from '../../src/utils/isSameDay';

import {
  START_DATE,
  END_DATE,
} from '../../src/constants';

// Set to noon to mimic how days in the picker are configured internally
const today = moment().startOf('day').hours(12);

describe('DateRangePickerInputController', () => {
  describe('#render', () => {
    it('renders a DateRangePickerInput', () => {
      const wrapper = shallow(<DateRangePickerInputController />);
      expect(wrapper.find(DateRangePickerInput)).to.have.lengthOf(1);
    });
  });

  describe('#clearDates', () => {
    describe('props.reopenPickerOnClearDates is truthy', () => {
      describe('props.onFocusChange', () => {
        it('is called once', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              onFocusChange={onFocusChangeStub}
              reopenPickerOnClearDates
            />
          ));
          wrapper.instance().clearDates();
          expect(onFocusChangeStub.callCount).to.equal(1);
        });

        it('is called with arg START_DATE', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              onFocusChange={onFocusChangeStub}
              reopenPickerOnClearDates
            />
          ));
          wrapper.instance().clearDates();
          expect(onFocusChangeStub.getCall(0).args[0]).to.equal(START_DATE);
        });
      });
    });

    describe('props.reopenPickerOnClearDates is falsy', () => {
      describe('props.onFocusChange', () => {
        it('is not called', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
          ));
          wrapper.instance().clearDates();
          expect(onFocusChangeStub.callCount).to.equal(0);
        });
      });
    });

    it('calls props.onDatesChange with arg { startDate: null, endDate: null }', () => {
      const onDatesChangeStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePickerInputController onDatesChange={onDatesChangeStub} />
      ));
      wrapper.instance().clearDates();
      expect(onDatesChangeStub.callCount).to.equal(1);
    });
  });

  describe('#onClearFocus', () => {
    it('calls props.onFocusChange', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(<DateRangePickerInputController onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onClearFocus();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('calls props.onFocusChange with null arg', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(<DateRangePickerInputController onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onClearFocus();
      expect(onFocusChangeStub.calledWith(null)).to.equal(true);
    });

    it('calls props.onClose with startDate and endDate args', () => {
      const onCloseStub = sinon.stub();
      const endDate = moment(today).add(1, 'days');

      const wrapper = shallow((
        <DateRangePickerInputController
          onFocusChange={() => null}
          onClose={onCloseStub}
          startDate={today}
          endDate={endDate}
        />
      ));

      wrapper.instance().onClearFocus();
      const args = onCloseStub.getCall(0).args[0];
      expect(args.startDate).to.equal(today);
      expect(args.endDate).to.equal(endDate);
    });
  });

  describe('#onEndDateChange', () => {
    describe('is a valid end date', () => {
      const validFutureDateString = moment(today).add(10, 'days').format('YYYY-MM-DD');
      describe('when props.startDate is not provided', () => {
        it('calls props.onDatesChange with provided end date', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController onDatesChange={onDatesChangeStub} />
          ));
          wrapper.instance().onEndDateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const [{ startDate, endDate }] = onDatesChangeStub.getCall(0).args;
          expect(startDate).to.equal(wrapper.props().startDate);
          expect(isSameDay(endDate, moment(validFutureDateString))).to.equal(true);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEndDateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with null arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEndDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });

      describe('is before props.startDate', () => {
        const startDate = moment(today).add(15, 'days');
        it('calls props.onDatesChange with props.startDate and null end date', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              onDatesChange={onDatesChangeStub}
              startDate={startDate}
            />
          ));
          wrapper.instance().onEndDateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          expect(onDatesChangeArgs.startDate).to.equal(startDate);
          expect(onDatesChangeArgs.endDate).to.equal(null);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEndDateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with null arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEndDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });

      describe('is after props.startDate', () => {
        const startDate = moment(today);
        it('calls props.onDatesChange with props.startDate and provided end date', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              onDatesChange={onDatesChangeStub}
              startDate={startDate}
            />
          ));
          wrapper.instance().onEndDateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          const futureDate = moment(validFutureDateString);
          expect(onDatesChangeArgs.startDate).to.equal(startDate);
          expect(isSameDay(onDatesChangeArgs.endDate, futureDate)).to.equal(true);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEndDateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with null arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEndDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });

      describe('is the same day as props.startDate', () => {
        const startDate = moment(today).add(10, 'days');

        describe('props.minimumNights is 0', () => {
          it('calls props.onDatesChange with props.startDate and provided end date', () => {
            const onDatesChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onDatesChange={onDatesChangeStub}
                startDate={startDate}
                minimumNights={0}
              />
            ));
            wrapper.instance().onEndDateChange(validFutureDateString);
            expect(onDatesChangeStub.callCount).to.equal(1);

            const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            const futureDate = moment(validFutureDateString);
            expect(onDatesChangeArgs.startDate).to.equal(startDate);
            expect(isSameDay(onDatesChangeArgs.endDate, futureDate)).to.equal(true);
          });
        });

        describe('props.minimumNights is greater than 0', () => {
          it('calls props.onDatesChange with props.startDate and null end date', () => {
            const onDatesChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onDatesChange={onDatesChangeStub}
                startDate={startDate}
                minimumNights={1}
              />
            ));
            wrapper.instance().onEndDateChange(validFutureDateString);
            expect(onDatesChangeStub.callCount).to.equal(1);

            const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            expect(onDatesChangeArgs.startDate).to.equal(startDate);
            expect(onDatesChangeArgs.endDate).to.equal(null);
          });
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEndDateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with null arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEndDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });
    });

    describe('matches custom display format', () => {
      const customFormat = 'YY|MM[foobar]DD';
      const customFormatDateString = moment(today).add(5, 'days').format(customFormat);
      it('calls props.onDatesChange with correct arguments', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            displayFormat={customFormat}
            onDatesChange={onDatesChangeStub}
          />
        ));
        wrapper.instance().onEndDateChange(customFormatDateString);
        expect(onDatesChangeStub.callCount).to.equal(1);

        const { startDate, endDate } = onDatesChangeStub.getCall(0).args[0];
        expect(startDate).to.equal(wrapper.instance().props.startDate);
        expect(endDate.format(customFormat)).to.equal(customFormatDateString);
      });

      describe('props.onFocusChange', () => {
        it('is called once', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              displayFormat={customFormat}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onEndDateChange(customFormatDateString);
          expect(onFocusChangeStub.callCount).to.equal(1);
        });

        it('is called with null arg', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              displayFormat={customFormat}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onEndDateChange(customFormatDateString);
          expect(onFocusChangeStub.calledWith(null)).to.equal(true);
        });
      });
    });

    describe('is not a valid date string', () => {
      const invalidDateString = 'foo';
      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController onDatesChange={onDatesChangeStub} />
        ));
        wrapper.instance().onEndDateChange(invalidDateString);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with startDate === props.startDate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            startDate={today}
          />
        ));
        wrapper.instance().onEndDateChange(invalidDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(today);
      });

      it('calls props.onDatesChange with endDate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController onDatesChange={onDatesChangeStub} />
        ));
        wrapper.instance().onEndDateChange(invalidDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.endDate).to.equal(null);
      });
    });

    describe('is outside range', () => {
      const futureDate = moment().add(7, 'day').toISOString();
      const isOutsideRange = day => day >= moment().add(3, 'day');

      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            isOutsideRange={isOutsideRange}
          />
        ));
        wrapper.instance().onEndDateChange(futureDate);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with startDate === props.startDate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            startDate={today}
            isOutsideRange={isOutsideRange}
          />
        ));
        wrapper.instance().onEndDateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(today);
      });

      it('calls props.onDatesChange with endDate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            isOutsideRange={isOutsideRange}
          />
        ));
        wrapper.instance().onEndDateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.endDate).to.equal(null);
      });
    });

    describe('is inclusively before state.startDate', () => {
      const startDate = moment(today).add(10, 'days');
      const beforeStartDateString = today.toISOString();
      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            startDate={startDate}
          />
        ));
        wrapper.instance().onEndDateChange(beforeStartDateString);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with startDate === props.startDate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            startDate={startDate}
          />
        ));
        wrapper.instance().onEndDateChange(beforeStartDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(startDate);
      });

      it('calls props.onDatesChange with endDate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            startDate={startDate}
          />
        ));
        wrapper.instance().onEndDateChange(beforeStartDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.endDate).to.equal(null);
      });
    });
  });

  describe('#onStartDateChange', () => {
    describe('is a valid start date', () => {
      const validFutureDateString = moment(today).add(5, 'days').format('YYYY-MM-DD');
      describe('is before props.endDate', () => {
        const endDate = moment(today).add(10, 'days');
        it('calls props.onDatesChange provided start date and props.endDate', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController onDatesChange={onDatesChangeStub} endDate={endDate} />
          ));
          wrapper.instance().onStartDateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          const futureDate = moment(validFutureDateString);
          expect(isSameDay(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
          expect(onDatesChangeArgs.endDate).to.equal(endDate);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onFocusChange={onFocusChangeStub}
                endDate={endDate}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with END_DATE arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onFocusChange={onFocusChangeStub}
                endDate={endDate}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(END_DATE)).to.equal(true);
          });
        });
      });

      describe('is after props.endDate', () => {
        const endDate = moment(today);
        it('calls props.onDatesChange with provided start date and null end date', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              onDatesChange={onDatesChangeStub}
              endDate={endDate}
            />
          ));
          wrapper.instance().onStartDateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          const futureDate = moment(validFutureDateString);
          expect(isSameDay(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
          expect(onDatesChangeArgs.endDate).to.equal(null);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onFocusChange={onFocusChangeStub}
                endDate={endDate}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with END_DATE arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onFocusChange={onFocusChangeStub}
                endDate={endDate}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(END_DATE)).to.equal(true);
          });
        });
      });

      describe('is the same day as props.endDate', () => {
        const endDate = moment(today).add(5, 'days');

        describe('props.minimumNights is 0', () => {
          it('calls props.onDatesChange with provided start date and props.endDate', () => {
            const onDatesChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onDatesChange={onDatesChangeStub}
                endDate={endDate}
                minimumNights={0}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onDatesChangeStub.callCount).to.equal(1);

            const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            const futureDate = moment(validFutureDateString);
            expect(isSameDay(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
            expect(onDatesChangeArgs.endDate).to.equal(endDate);
          });
        });

        describe('props.minimumNights is greater than 0', () => {
          it('calls props.onDatesChange with provided start date and null end date', () => {
            const onDatesChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onDatesChange={onDatesChangeStub}
                endDate={endDate}
                minimumNights={1}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onDatesChangeStub.callCount).to.equal(1);

            const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            const futureDate = moment(validFutureDateString);
            expect(isSameDay(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
            expect(onDatesChangeArgs.endDate).to.equal(null);
          });
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onFocusChange={onFocusChangeStub}
                endDate={endDate}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with END_DATE arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onFocusChange={onFocusChangeStub}
                endDate={endDate}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(END_DATE)).to.equal(true);
          });
        });
      });
    });

    describe('matches custom display format', () => {
      const customFormat = 'YY|MM[foobar]DD';
      const customFormatDateString = moment(today).add(5, 'days').format(customFormat);
      it('calls props.onDatesChange with correct arguments', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            displayFormat={customFormat}
            onDatesChange={onDatesChangeStub}
          />
        ));
        wrapper.instance().onStartDateChange(customFormatDateString);
        expect(onDatesChangeStub.callCount).to.equal(1);

        const { startDate, endDate } = onDatesChangeStub.getCall(0).args[0];
        expect(startDate.format(customFormat)).to.equal(customFormatDateString);
        expect(endDate).to.equal(wrapper.instance().props.endDate);
      });

      describe('props.onFocusChange', () => {
        it('is called once', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              displayFormat={customFormat}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onStartDateChange(customFormatDateString);
          expect(onFocusChangeStub.callCount).to.equal(1);
        });

        it('is called with END_DATE arg', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              displayFormat={customFormat}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onStartDateChange(customFormatDateString);
          expect(onFocusChangeStub.calledWith(END_DATE)).to.equal(true);
        });
      });
    });

    describe('is not a valid date string', () => {
      const invalidDateString = 'foo';
      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController onDatesChange={onDatesChangeStub} />
        ));
        wrapper.instance().onStartDateChange(invalidDateString);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with startDate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            startDate={today}
          />
        ));
        wrapper.instance().onStartDateChange(invalidDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(null);
      });

      it('calls props.onDatesChange with endDate === props.endDate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController onDatesChange={onDatesChangeStub} endDate={today} />
        ));
        wrapper.instance().onStartDateChange(invalidDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.endDate).to.equal(today);
      });
    });

    describe('is outside range', () => {
      const futureDate = moment().add(7, 'days').toISOString();
      const isOutsideRange = day => day > moment().add(5, 'days');

      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            isOutsideRange={isOutsideRange}
          />
        ));
        wrapper.instance().onStartDateChange(futureDate);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with startDate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            startDate={today}
            isOutsideRange={isOutsideRange}
          />
        ));
        wrapper.instance().onStartDateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(null);
      });

      it('calls props.onDatesChange with endDate === props.endDate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            endDate={today}
            isOutsideRange={isOutsideRange}
          />
        ));
        wrapper.instance().onStartDateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.endDate).to.equal(today);
      });
    });
  });

  describe('#onStartDateFocus', () => {
    it('calls props.onFocusChange once', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
      ));
      wrapper.instance().onStartDateFocus();
      expect(onFocusChangeStub).to.have.property('callCount', 1);
    });

    it('calls props.onFocusChange with START_DATE as arg', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
      ));
      wrapper.instance().onStartDateFocus();
      expect(onFocusChangeStub.getCall(0).args[0]).to.equal(START_DATE);
    });

    describe('props.disabled = true', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController disabled onFocusChange={onFocusChangeStub} />
        ));
        wrapper.instance().onStartDateFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 0);
      });
    });
  });

  describe('#onEndDateFocus', () => {
    it('calls props.onFocusChange once with arg END_DATE', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
      ));
      wrapper.instance().onEndDateFocus();
      expect(onFocusChangeStub).to.have.property('callCount', 1);
      expect(onFocusChangeStub.getCall(0).args[0]).to.equal(END_DATE);
    });

    describe('props.startDate = moment', () => {
      it('calls props.onFocusChange once with arg END_DATE', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            startDate={moment(today)}
            onFocusChange={onFocusChangeStub}
          />
        ));
        wrapper.instance().onEndDateFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 1);
        expect(onFocusChangeStub.getCall(0).args[0]).to.equal(END_DATE);
      });
    });

    describe('props.withFullScreenPortal is truthy', () => {
      it('calls props.onFocusChange once with arg START_DATE', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            withFullScreenPortal
            onFocusChange={onFocusChangeStub}
          />
        ));
        wrapper.instance().onEndDateFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 1);
        expect(onFocusChangeStub.getCall(0).args[0]).to.equal(START_DATE);
      });
    });

    describe('props.startDate = moment', () => {
      it('calls props.onFocusChange once with arg END_DATE', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            startDate={moment(today)}
            onFocusChange={onFocusChangeStub}
          />
        ));
        wrapper.instance().onEndDateFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 1);
        expect(onFocusChangeStub.getCall(0).args[0]).to.equal(END_DATE);
      });
    });

    describe('props.disabled = true', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController disabled onFocusChange={onFocusChangeStub} />
        ));
        wrapper.instance().onEndDateFocus();
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });
  });
});
