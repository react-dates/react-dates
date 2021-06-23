import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import startOfDay from 'date-fns/startOfDay';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import DateRangePickerInput from '../../src/components/DateRangePickerInput';
import DateRangePickerInputController
  from '../../src/components/DateRangePickerInputController';

import {
  START_DATE,
  END_DATE,
} from '../../src/constants';

// Set to noon to mimic how days in the picker are configured internally
const today = addHours(startOfDay(new Date()), 12);

describe('DateRangePickerInputController', () => {
  describe('#render', () => {
    it('renders a DateRangePickerInput', () => {
      const wrapper = shallow(<DateRangePickerInputController />);
      expect(wrapper.find(DateRangePickerInput)).to.have.lengthOf(1);
    });

    it('should pass children to DateRangePickerInput when provided', () => {
      const Child = () => <div>CHILD</div>;

      const wrapper = shallow((
        <DateRangePickerInputController>
          <Child />
        </DateRangePickerInputController>
      ));
      expect(wrapper.find(DateRangePickerInput)).to.have.property('children');
      expect(wrapper.find(Child)).to.have.lengthOf(1);
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

    it('calls props.onDatesChange with arg { startDate: null, enddate: null }', () => {
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

    it('calls props.onClose with startDate and enddate args', () => {
      const onCloseStub = sinon.stub();
      const enddate = addDays(today, 1);

      const wrapper = shallow((
        <DateRangePickerInputController
          onFocusChange={() => null}
          onClose={onCloseStub}
          startDate={today}
          enddate={enddate}
        />
      ));

      wrapper.instance().onClearFocus();
      const args = onCloseStub.getCall(0).args[0];
      expect(args.startDate).to.equal(today);
      expect(args.enddate).to.equal(enddate);
    });
  });

  describe('#onEnddateChange', () => {
    describe('is a valid end date', () => {
      const validFutureDateString = format(addDays(today, 10), 'yyyy-MM-dd');
      describe('when props.startDate is not provided', () => {
        it('calls props.onDatesChange with provided end date', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController onDatesChange={onDatesChangeStub} />
          ));
          wrapper.instance().onEnddateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const [{ startDate, enddate }] = onDatesChangeStub.getCall(0).args;
          expect(startDate).to.equal(wrapper.props().startDate);
          expect(isSameDay(enddate, parseISO(validFutureDateString))).to.equal(true);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEnddateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with null arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEnddateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });

      describe('is before props.startDate', () => {
        const startDate = addDays(today, 15);
        it('calls props.onDatesChange with props.startDate and null end date', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              onDatesChange={onDatesChangeStub}
              startDate={startDate}
            />
          ));
          wrapper.instance().onEnddateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          expect(onDatesChangeArgs.startDate).to.equal(startDate);
          expect(onDatesChangeArgs.enddate).to.equal(null);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEnddateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with null arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEnddateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });

      describe('is after props.startDate', () => {
        const startDate = new Date(today);
        it('calls props.onDatesChange with props.startDate and provided end date', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              onDatesChange={onDatesChangeStub}
              startDate={startDate}
            />
          ));
          wrapper.instance().onEnddateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          const futureDate = parseISO(validFutureDateString);
          expect(onDatesChangeArgs.startDate).to.equal(startDate);
          expect(isSameDay(onDatesChangeArgs.enddate, futureDate)).to.equal(true);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEnddateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with null arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEnddateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });

      describe('is the same day as props.startDate', () => {
        const startDate = addDays(today, 10);

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
            wrapper.instance().onEnddateChange(validFutureDateString);
            expect(onDatesChangeStub.callCount).to.equal(1);

            const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            const futureDate = parseISO(validFutureDateString);
            expect(onDatesChangeArgs.startDate).to.equal(startDate);
            expect(isSameDay(onDatesChangeArgs.enddate, futureDate)).to.equal(true);
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
            wrapper.instance().onEnddateChange(validFutureDateString);
            expect(onDatesChangeStub.callCount).to.equal(1);

            const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            expect(onDatesChangeArgs.startDate).to.equal(startDate);
            expect(onDatesChangeArgs.enddate).to.equal(null);
          });
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEnddateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with null arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
            ));
            wrapper.instance().onEnddateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(null)).to.equal(true);
          });
        });
      });
    });

    describe('matches custom display format', () => {
      const customFormat = "yy|MM'[foobar]'dd";
      const customFormatDateString = format(addDays(today, 5), customFormat);
      it('calls props.onDatesChange with correct arguments', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            displayFormat={customFormat}
            onDatesChange={onDatesChangeStub}
          />
        ));
        wrapper.instance().onEnddateChange(customFormatDateString);
        expect(onDatesChangeStub.callCount).to.equal(1);

        const { startDate, enddate } = onDatesChangeStub.getCall(0).args[0];
        expect(startDate).to.equal(wrapper.instance().props.startDate);
        expect(format(enddate, customFormat)).to.equal(customFormatDateString);
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
          wrapper.instance().onEnddateChange(customFormatDateString);
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
          wrapper.instance().onEnddateChange(customFormatDateString);
          expect(onFocusChangeStub.calledWith(null)).to.equal(true);
        });
      });
    });

    describe('is not a valid date string', () => {
      const invaliddateString = 'foo';
      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController onDatesChange={onDatesChangeStub} />
        ));
        wrapper.instance().onEnddateChange(invaliddateString);
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
        wrapper.instance().onEnddateChange(invaliddateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(today);
      });

      it('calls props.onDatesChange with enddate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController onDatesChange={onDatesChangeStub} />
        ));
        wrapper.instance().onEnddateChange(invaliddateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.enddate).to.equal(null);
      });
    });

    describe('is blocked', () => {
      const futureDate = format(addDays(new Date(), 7), 'dd-MM-yyyy');
      const isDayBlocked = sinon.stub().returns(true);

      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            isDayBlocked={isDayBlocked}
          />
        ));
        wrapper.instance().onEnddateChange(futureDate);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with enddate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            startDate={today}
            isDayBlocked={isDayBlocked}
          />
        ));
        wrapper.instance().onEnddateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.enddate).to.equal(null);
      });
    });

    describe('is outside range', () => {
      const futureDate = format(addDays(new Date(), 7), 'dd-MM-yyyy');
      const isOutsideRange = (day) => day >= addDays(new Date(), 3);

      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            isOutsideRange={isOutsideRange}
          />
        ));
        wrapper.instance().onEnddateChange(futureDate);
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
        wrapper.instance().onEnddateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(today);
      });

      it('calls props.onDatesChange with enddate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            isOutsideRange={isOutsideRange}
          />
        ));
        wrapper.instance().onEnddateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.enddate).to.equal(null);
      });
    });

    describe('is inclusively before state.startDate', () => {
      const startDate = addDays(today, 10);
      const beforeStartDateString = today.toISOString();
      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            startDate={startDate}
          />
        ));
        wrapper.instance().onEnddateChange(beforeStartDateString);
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
        wrapper.instance().onEnddateChange(beforeStartDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(startDate);
      });

      it('calls props.onDatesChange with enddate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            startDate={startDate}
          />
        ));
        wrapper.instance().onEnddateChange(beforeStartDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.enddate).to.equal(null);
      });
    });
  });

  describe('#onStartDateChange', () => {
    describe('is a valid start date', () => {
      const validFutureDateString = format(addDays(today, 5), 'yyyy-MM-dd');
      describe('is before props.enddate', () => {
        const enddate = addDays(today, 10);
        it('calls props.onDatesChange provided start date and props.enddate', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController onDatesChange={onDatesChangeStub} enddate={enddate} />
          ));
          wrapper.instance().onStartDateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          const futureDate = parseISO(validFutureDateString);
          expect(isSameDay(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
          expect(onDatesChangeArgs.enddate).to.equal(enddate);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onFocusChange={onFocusChangeStub}
                enddate={enddate}
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
                enddate={enddate}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(END_DATE)).to.equal(true);
          });
        });
      });

      describe('is after props.enddate', () => {
        const enddate = new Date(today);
        it('calls props.onDatesChange with provided start date and null end date', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              onDatesChange={onDatesChangeStub}
              enddate={enddate}
            />
          ));
          wrapper.instance().onStartDateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          const futureDate = parseISO(validFutureDateString);
          expect(isSameDay(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
          expect(onDatesChangeArgs.enddate).to.equal(null);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onFocusChange={onFocusChangeStub}
                enddate={enddate}
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
                enddate={enddate}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(END_DATE)).to.equal(true);
          });
        });
      });

      describe('is the same day as props.enddate', () => {
        const enddate = addDays(today, 5);

        describe('props.minimumNights is 0', () => {
          it('calls props.onDatesChange with provided start date and props.enddate', () => {
            const onDatesChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onDatesChange={onDatesChangeStub}
                enddate={enddate}
                minimumNights={0}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onDatesChangeStub.callCount).to.equal(1);

            const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            const futureDate = parseISO(validFutureDateString);
            expect(isSameDay(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
            expect(onDatesChangeArgs.enddate).to.equal(enddate);
          });
        });

        describe('props.minimumNights is greater than 0', () => {
          it('calls props.onDatesChange with provided start date and null end date', () => {
            const onDatesChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onDatesChange={onDatesChangeStub}
                enddate={enddate}
                minimumNights={1}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onDatesChangeStub.callCount).to.equal(1);

            const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
            const futureDate = parseISO(validFutureDateString);
            expect(isSameDay(onDatesChangeArgs.startDate, futureDate)).to.equal(true);
            expect(onDatesChangeArgs.enddate).to.equal(null);
          });
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow((
              <DateRangePickerInputController
                onFocusChange={onFocusChangeStub}
                enddate={enddate}
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
                enddate={enddate}
              />
            ));
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(END_DATE)).to.equal(true);
          });
        });
      });
    });

    describe('matches custom display format', () => {
      const customFormat = "yy|MM'[foobar]'dd";
      const customFormatDateString = format(addDays(today, 5), customFormat);
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

        const { startDate, enddate } = onDatesChangeStub.getCall(0).args[0];
        expect(format(startDate, customFormat)).to.equal(customFormatDateString);
        expect(enddate).to.equal(wrapper.instance().props.enddate);
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
      const invaliddateString = 'foo';
      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController onDatesChange={onDatesChangeStub} />
        ));
        wrapper.instance().onStartDateChange(invaliddateString);
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
        wrapper.instance().onStartDateChange(invaliddateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(null);
      });

      it('calls props.onDatesChange with enddate === props.enddate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController onDatesChange={onDatesChangeStub} enddate={today} />
        ));
        wrapper.instance().onStartDateChange(invaliddateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.enddate).to.equal(today);
      });
    });

    describe('is blocked', () => {
      const futureDate = format(addDays(new Date(), 7), 'dd-MM-yyyy');
      const isDayBlocked = sinon.stub().returns(true);

      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            isDayBlocked={isDayBlocked}
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
            isDayBlocked={isDayBlocked}
          />
        ));
        wrapper.instance().onStartDateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(null);
      });
    });

    describe('is outside range', () => {
      const futureDate = addDays(new Date(), 7).toISOString();
      const isOutsideRange = (day) => day > addDays(new Date(), 5);

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

      it('calls props.onDatesChange with enddate === props.enddate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            onDatesChange={onDatesChangeStub}
            enddate={today}
            isOutsideRange={isOutsideRange}
          />
        ));
        wrapper.instance().onStartDateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.enddate).to.equal(today);
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

    describe('props.disabled', () => {
      describe('props.disabled=START_DATE', () => {
        it('does not call props.onFocusChange', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              disabled={START_DATE}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onStartDateFocus();
          expect(onFocusChangeStub).to.have.property('callCount', 0);
        });
      });

      describe('props.disabled=END_DATE', () => {
        it('does call props.onFocusChange', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              disabled={END_DATE}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onStartDateFocus();
          expect(onFocusChangeStub).to.have.property('callCount', 1);
        });
      });

      describe('props.disabled=true', () => {
        it('does not call props.onFocusChange', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              disabled
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onStartDateFocus();
          expect(onFocusChangeStub).to.have.property('callCount', 0);
        });
      });

      describe('props.disabled=false', () => {
        it('does call props.onFocusChange', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              disabled={false}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onStartDateFocus();
          expect(onFocusChangeStub).to.have.property('callCount', 1);
        });
      });
    });
  });

  describe('#onEnddateFocus', () => {
    it('calls props.onFocusChange once with arg END_DATE', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <DateRangePickerInputController onFocusChange={onFocusChangeStub} />
      ));
      wrapper.instance().onEnddateFocus();
      expect(onFocusChangeStub).to.have.property('callCount', 1);
      expect(onFocusChangeStub.getCall(0).args[0]).to.equal(END_DATE);
    });

    describe('props.startDate = new Date()', () => {
      it('calls props.onFocusChange once with arg END_DATE', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            startDate={new Date(today)}
            onFocusChange={onFocusChangeStub}
          />
        ));
        wrapper.instance().onEnddateFocus();
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
        wrapper.instance().onEnddateFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 1);
        expect(onFocusChangeStub.getCall(0).args[0]).to.equal(START_DATE);
      });
    });

    describe('props.startDate = new Date()', () => {
      it('calls props.onFocusChange once with arg END_DATE', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <DateRangePickerInputController
            startDate={new Date(today)}
            onFocusChange={onFocusChangeStub}
          />
        ));
        wrapper.instance().onEnddateFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 1);
        expect(onFocusChangeStub.getCall(0).args[0]).to.equal(END_DATE);
      });
    });

    describe('props.disabled', () => {
      describe('props.disabled=START_DATE', () => {
        it('does call props.onFocusChange', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              disabled={START_DATE}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onEnddateFocus();
          expect(onFocusChangeStub.callCount).to.equal(1);
        });
      });

      describe('props.disabled=END_DATE', () => {
        it('does not call props.onFocusChange', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              disabled={END_DATE}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onEnddateFocus();
          expect(onFocusChangeStub.callCount).to.equal(0);
        });
      });

      describe('props.disabled=true', () => {
        it('does not call props.onFocusChange', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              disabled
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onEnddateFocus();
          expect(onFocusChangeStub.callCount).to.equal(0);
        });
      });

      describe('props.disabled=false', () => {
        it('does call props.onFocusChange', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <DateRangePickerInputController
              disabled={false}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().onEnddateFocus();
          expect(onFocusChangeStub.callCount).to.equal(1);
        });
      });
    });
  });
});
