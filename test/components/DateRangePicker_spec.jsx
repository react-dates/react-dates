import React from 'react';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';
import Portal from 'react-portal';

import DateRangePicker from '../../src/components/DateRangePicker';

import DateRangePickerInput from '../../src/components/DateRangePickerInput';
import DayPicker from '../../src/components/DayPicker';

import OutsideClickHandler from '../../src/components/OutsideClickHandler';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  START_DATE,
  END_DATE,
} from '../../src/constants';

const today = moment().startOf('day');

describe('DateRangePicker', () => {
  describe('#render()', () => {
    it('has .DateRangePicker class', () => {
      const wrapper = shallow(<DateRangePicker />);
      expect(wrapper.find('.DateRangePicker')).to.have.length(1);
    });

    it('renders .DateRangePicker__picker class', () => {
      const wrapper = shallow(<DateRangePicker />);
      expect(wrapper.find('.DateRangePicker__picker')).to.have.length(1);
    });

    it('renders <OutsideClickHandler />', () => {
      const wrapper = shallow(<DateRangePicker />);
      expect(wrapper.find(OutsideClickHandler)).to.have.length(1);
    });

    it('renders <DateRangePickerInput />', () => {
      const wrapper = shallow(<DateRangePicker />);
      expect(wrapper.find(DateRangePickerInput)).to.have.length(1);
    });

    it('renders <DayPicker />', () => {
      const wrapper = shallow(<DateRangePicker />);
      expect(wrapper.find(DayPicker)).to.have.length(1);
    });

    describe('props.orientation === VERTICAL_ORIENTATION', () => {
      it('renders .DateRangePicker__picker--vertical class', () => {
        const wrapper = shallow(<DateRangePicker orientation={VERTICAL_ORIENTATION} />);
        expect(wrapper.find('.DateRangePicker__picker--vertical')).to.have.length(1);
      });
    });

    describe('props.orientation === HORIZONTAL_ORIENTATION', () => {
      it('renders .DateRangePicker__picker--horizontal class', () => {
        const wrapper = shallow(<DateRangePicker orientation={HORIZONTAL_ORIENTATION} />);
        expect(wrapper.find('.DateRangePicker__picker--horizontal')).to.have.length(1);
      });

      it('renders <DayPicker /> with props.numberOfMonths === 2', () => {
        const wrapper = shallow(<DateRangePicker orientation={HORIZONTAL_ORIENTATION} />);
        expect(wrapper.find(DayPicker).props().numberOfMonths).to.equal(2);
      });
    });

    describe('props.withPortal is truthy', () => {
      it('renders .DateRangePicker__picker--portal class', () => {
        const wrapper = shallow(<DateRangePicker withPortal />);
        expect(wrapper.find('.DateRangePicker__picker--portal')).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow(<DateRangePicker withPortal />);
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('isOpened prop is false if props.focusedInput === null', () => {
          const wrapper =
            shallow(<DateRangePicker focusedInput={null} withPortal />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(false);
        });

        it('isOpened prop is true if props.focusedInput !== null', () => {
          const wrapper = shallow(<DateRangePicker withPortal focusedInput={START_DATE} />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(true);
        });
      });
    });

    describe('props.withFullScreenPortal is truthy', () => {
      it('renders .DateRangePicker__picker--portal class', () => {
        const wrapper = shallow(<DateRangePicker withFullScreenPortal />);
        expect(wrapper.find('.DateRangePicker__picker--portal')).to.have.length(1);
      });

      it('renders .DateRangePicker__picker--full-screen-portal class', () => {
        const wrapper = shallow(<DateRangePicker withFullScreenPortal />);
        expect(wrapper.find('.DateRangePicker__picker--full-screen-portal')).to.have.length(1);
      });

      it('renders .DateRangePicker__close class', () => {
        const wrapper = shallow(<DateRangePicker withFullScreenPortal />);
        expect(wrapper.find('.DateRangePicker__close')).to.have.length(1);
      });

      describe('<Portal />', () => {
        it('is rendered', () => {
          const wrapper = shallow(<DateRangePicker withFullScreenPortal />);
          expect(wrapper.find(Portal)).to.have.length(1);
        });

        it('isOpened prop is false if props.focusedInput === null', () => {
          const wrapper =
            shallow(<DateRangePicker focusedInput={null} withFullScreenPortal />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(false);
        });

        it('isOpened prop is true if props.focusedInput !== null', () => {
          const wrapper =
            shallow(<DateRangePicker withFullScreenPortal focusedInput={START_DATE} />);
          expect(wrapper.find(Portal).props().isOpened).to.equal(true);
        });
      });
    });

    describe('props.focusedInput', () => {
      it('shows datepicker if props.focusedInput != null', () => {
        const wrapper = shallow(<DateRangePicker focusedInput={START_DATE} />);
        expect(wrapper.find('.DateRangePicker__picker--show')).to.have.length(1);
      });

      it('hides datepicker if props.focusedInput = null', () => {
        const wrapper = shallow(<DateRangePicker focusedInput={null} />);
        expect(wrapper.find('.DateRangePicker__picker--invisible')).to.have.length(1);
      });

      it('has .DateRangePicker-picker--start class if props.focusedInput=START_DATE', () => {
        const wrapper = shallow(<DateRangePicker focusedInput={START_DATE} />);
        expect(wrapper.find('.DateRangePicker__picker--start')).to.have.length(1);
      });

      it('has .DateRangePicker-picker--end class if props.focusedInput=END_DATE', () => {
        const wrapper = shallow(<DateRangePicker focusedInput={END_DATE} />);
        expect(wrapper.find('.DateRangePicker__picker--end')).to.have.length(1);
      });
    });
  });

  describe('#clearDates', () => {
    describe('props.onFocusChange', () => {
      it('is called once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<DateRangePicker onFocusChange={onFocusChangeStub} />);
        wrapper.instance().clearDates();
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('is called with arg START_DATE', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<DateRangePicker onFocusChange={onFocusChangeStub} />);
        wrapper.instance().clearDates();
        expect(onFocusChangeStub.getCall(0).args[0]).to.equal(START_DATE);
      });
    });

    it('calls props.onDatesChange with arg { startDate: null, endDate: null }', () => {
      const onDatesChangeStub = sinon.stub();
      const wrapper = shallow(<DateRangePicker onDatesChange={onDatesChangeStub} />);
      wrapper.instance().clearDates();
      expect(onDatesChangeStub.callCount).to.equal(1);
    });
  });

  describe('#onDayClick', () => {
    describe('day argument is a blocked day', () => {
      it('props.onFocusChange is not called', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<DateRangePicker onFocusChange={onFocusChangeStub} />);
        wrapper.instance().onDayClick(today, ['blocked']);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });

      it('props.onDatesChange is not called', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(<DateRangePicker onDatesChange={onDatesChangeStub} />);
        wrapper.instance().onDayClick(today, ['blocked']);
        expect(onDatesChangeStub.callCount).to.equal(0);
      });
    });

    describe('props.focusedInput === START_DATE', () => {
      describe('props.onFocusChange', () => {
        it('is called once', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow(
            <DateRangePicker focusedInput={START_DATE} onFocusChange={onFocusChangeStub} />
          );
          wrapper.instance().onDayClick(today, []);
          expect(onFocusChangeStub.callCount).to.equal(1);
        });

        it('is called with END_DATE', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow(
            <DateRangePicker focusedInput={START_DATE} onFocusChange={onFocusChangeStub} />
          );
          wrapper.instance().onDayClick(today, []);
          expect(onFocusChangeStub.getCall(0).args[0]).to.equal(END_DATE);
        });
      });

      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper =
          shallow(<DateRangePicker focusedInput={START_DATE} onDatesChange={onDatesChangeStub} />);
        wrapper.instance().onDayClick(today, []);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      describe('arg is after props.endDate', () => {
        it('calls props.onDatesChange with startDate === arg and endDate === null', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow(
            <DateRangePicker
              focusedInput={START_DATE}
              endDate={today}
              onDatesChange={onDatesChangeStub}
            />
          );
          const tomorrow = moment(today).add(1, 'days');
          wrapper.instance().onDayClick(tomorrow, []);
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
            <DateRangePicker
              focusedInput={START_DATE}
              endDate={tomorrow}
              onDatesChange={onDatesChangeStub}
            />
          );
          wrapper.instance().onDayClick(today, []);
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
            <DateRangePicker
              focusedInput={START_DATE}
              endDate={null}
              onDatesChange={onDatesChangeStub}
            />
          );
          wrapper.instance().onDayClick(today, []);
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
            <DateRangePicker
              focusedInput={END_DATE}
              startDate={moment(today).add(1, 'days')}
              onDatesChange={onDatesChangeStub}
            />
          );
          wrapper.instance().onDayClick(today, []);
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
              <DateRangePicker
                focusedInput={END_DATE}
                onDatesChange={onDatesChangeStub}
              />
            );
            wrapper.instance().onDayClick(today, []);
            const args = onDatesChangeStub.getCall(0).args[0];
            expect(args.startDate).to.equal(wrapper.props().startDate);
            expect(args.endDate).to.equal(today);
          }
        );

        describe('props.onFocusChange', () => {
          describe('props.startDate === null', () => {
            it('is called once', () => {
              const onFocusChangeStub = sinon.stub();
              const wrapper = shallow(
                <DateRangePicker focusedInput={END_DATE} onFocusChange={onFocusChangeStub} />
              );
              wrapper.instance().onDayClick(today, []);
              expect(onFocusChangeStub.callCount).to.equal(1);
            });

            it('is called with START_DATE', () => {
              const onFocusChangeStub = sinon.stub();
              const wrapper = shallow(
                <DateRangePicker focusedInput={END_DATE} onFocusChange={onFocusChangeStub} />
              );
              wrapper.instance().onDayClick(today, []);
              expect(onFocusChangeStub.getCall(0).args[0]).to.equal(START_DATE);
            });
          });

          describe('props.startDate is truthy', () => {
            it('is called once', () => {
              const onFocusChangeStub = sinon.stub();
              const wrapper = shallow(
                <DateRangePicker
                  focusedInput={END_DATE}
                  startDate={today}
                  onFocusChange={onFocusChangeStub}
                />
              );
              wrapper.instance().onDayClick(moment(today).add(1, 'days'), []);
              expect(onFocusChangeStub.callCount).to.equal(1);
            });

            it('is called with null', () => {
              const onFocusChangeStub = sinon.stub();
              const wrapper = shallow(
                <DateRangePicker
                  focusedInput={END_DATE}
                  startDate={today}
                  onFocusChange={onFocusChangeStub}
                />
              );
              wrapper.instance().onDayClick(moment(today).add(1, 'days'), []);
              expect(onFocusChangeStub.getCall(0).args[0]).to.equal(null);
            });
          });
        });
      });
    });
  });

  describe('#onEndDateChange', () => {
    describe('is a valid end date', () => {
      const validFutureDateString = moment(today).add(10, 'days').format('YYYY-MM-DD');
      it('calls props.onDatesChange with correct arguments', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(<DateRangePicker onDatesChange={onDatesChangeStub} />);
        wrapper.instance().onEndDateChange(validFutureDateString);
        expect(onDatesChangeStub.callCount).to.equal(1);

        const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
        expect(onDatesChangeArgs.startDate).to.equal(wrapper.props().startDate);
        expect(onDatesChangeArgs.endDate.isSame(validFutureDateString)).to.equal(true);
      });

      describe('props.onFocusChange', () => {
        it('is called once', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow(<DateRangePicker onFocusChange={onFocusChangeStub} />);
          wrapper.instance().onEndDateChange(validFutureDateString);
          expect(onFocusChangeStub.callCount).to.equal(1);
        });

        it('is called with null arg', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow(<DateRangePicker onFocusChange={onFocusChangeStub} />);
          wrapper.instance().onEndDateChange(validFutureDateString);
          expect(onFocusChangeStub.calledWith(null)).to.equal(true);
        });
      });
    });

    describe('is not a valid date string', () => {
      const invalidDateString = 'foo';
      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(<DateRangePicker onDatesChange={onDatesChangeStub} />);
        wrapper.instance().onEndDateChange(invalidDateString);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with startDate === props.startDate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            startDate={today}
          />
        );
        wrapper.instance().onEndDateChange(invalidDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(today);
      });

      it('calls props.onDatesChange with endDate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(<DateRangePicker onDatesChange={onDatesChangeStub} />);
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
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            isOutsideRange={isOutsideRange}
          />
        );
        wrapper.instance().onEndDateChange(futureDate);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with startDate === props.startDate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            startDate={today}
            isOutsideRange={isOutsideRange}
          />
        );
        wrapper.instance().onEndDateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(today);
      });

      it('calls props.onDatesChange with endDate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            isOutsideRange={isOutsideRange}
          />
        );
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
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            startDate={startDate}
          />
        );
        wrapper.instance().onEndDateChange(beforeStartDateString);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with startDate === props.startDate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            startDate={startDate}
          />
        );
        wrapper.instance().onEndDateChange(beforeStartDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(startDate);
      });

      it('calls props.onDatesChange with endDate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            startDate={startDate}
          />
        );
        wrapper.instance().onEndDateChange(beforeStartDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.endDate).to.equal(null);
      });
    });
  });

  describe('#onDayMouseEnter', () => {
    it('sets state.hoverDate to the day arg', () => {
      const wrapper = shallow(<DateRangePicker />);
      wrapper.instance().onDayMouseEnter(today);
      expect(wrapper.state().hoverDate).to.equal(today);
    });
  });

  describe('#onDayMouseLeave', () => {
    it('sets state.hoverDate to null', () => {
      const wrapper = shallow(<DateRangePicker />);
      wrapper.setState({
        hoverDate: today,
      });
      wrapper.instance().onDayMouseLeave(today);
      expect(wrapper.state().hoverDate).to.equal(null);
    });
  });

  describe('#onOutsideClick', () => {
    it('does not call props.onFocusChange if props.focusedInput = null', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper =
        shallow(<DateRangePicker focusedInput={null} onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onOutsideClick();
      expect(onFocusChangeStub.callCount).to.equal(0);
    });

    it('calls props.onFocusChange if props.focusedInput != null', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper =
        shallow(<DateRangePicker focusedInput={START_DATE} onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onOutsideClick();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });
  });

  describe('#onStartDateChange', () => {
    describe('is a valid start date', () => {
      const validFutureDateString = moment(today).add(5, 'days').format('YYYY-MM-DD');
      describe('is before props.endDate', () => {
        const endDate = moment(today).add(10, 'days');
        it('calls props.onDatesChange with correct arguments', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper =
            shallow(<DateRangePicker onDatesChange={onDatesChangeStub} endDate={endDate} />);
          wrapper.instance().onStartDateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          expect(onDatesChangeArgs.startDate.isSame(validFutureDateString)).to.equal(true);
          expect(onDatesChangeArgs.endDate).to.equal(endDate);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow(
              <DateRangePicker
                onFocusChange={onFocusChangeStub}
                endDate={endDate}
              />
            );
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with END_DATE arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow(
              <DateRangePicker
                onFocusChange={onFocusChangeStub}
                endDate={endDate}
              />
            );
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(END_DATE)).to.equal(true);
          });
        });
      });

      describe('is after props.endDate', () => {
        const endDate = moment(today);
        it('calls props.onDatesChange with correct arguments', () => {
          const onDatesChangeStub = sinon.stub();
          const wrapper = shallow(
            <DateRangePicker
              onDatesChange={onDatesChangeStub}
              endDate={endDate}
            />
          );
          wrapper.instance().onStartDateChange(validFutureDateString);
          expect(onDatesChangeStub.callCount).to.equal(1);

          const onDatesChangeArgs = onDatesChangeStub.getCall(0).args[0];
          expect(onDatesChangeArgs.startDate.isSame(validFutureDateString)).to.equal(true);
          expect(onDatesChangeArgs.endDate).to.equal(null);
        });

        describe('props.onFocusChange', () => {
          it('is called once', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow(
              <DateRangePicker
                onFocusChange={onFocusChangeStub}
                endDate={endDate}
              />
            );
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.callCount).to.equal(1);
          });

          it('is called with END_DATE arg', () => {
            const onFocusChangeStub = sinon.stub();
            const wrapper = shallow(
              <DateRangePicker
                onFocusChange={onFocusChangeStub}
                endDate={endDate}
              />
            );
            wrapper.instance().onStartDateChange(validFutureDateString);
            expect(onFocusChangeStub.calledWith(END_DATE)).to.equal(true);
          });
        });
      });
    });

    describe('is not a valid date string', () => {
      const invalidDateString = 'foo';
      it('calls props.onDatesChange', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(<DateRangePicker onDatesChange={onDatesChangeStub} />);
        wrapper.instance().onStartDateChange(invalidDateString);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with startDate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            startDate={today}
          />
        );
        wrapper.instance().onStartDateChange(invalidDateString);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(null);
      });

      it('calls props.onDatesChange with endDate === props.endDate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper =
          shallow(<DateRangePicker onDatesChange={onDatesChangeStub} endDate={today} />);
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
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            isOutsideRange={isOutsideRange}
          />
        );
        wrapper.instance().onStartDateChange(futureDate);
        expect(onDatesChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDatesChange with startDate === null', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            startDate={today}
            isOutsideRange={isOutsideRange}
          />
        );
        wrapper.instance().onStartDateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.startDate).to.equal(null);
      });

      it('calls props.onDatesChange with endDate === props.endDate', () => {
        const onDatesChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            onDatesChange={onDatesChangeStub}
            endDate={today}
            isOutsideRange={isOutsideRange}
          />
        );
        wrapper.instance().onStartDateChange(futureDate);
        const args = onDatesChangeStub.getCall(0).args[0];
        expect(args.endDate).to.equal(today);
      });
    });
  });

  describe('#onStartDateFocus', () => {
    it('calls props.onFocusChange once', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(<DateRangePicker onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onStartDateFocus();
      expect(onFocusChangeStub).to.have.property('callCount', 1);
    });

    it('calls props.onFocusChange with START_DATE as arg', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(<DateRangePicker onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onStartDateFocus();
      expect(onFocusChangeStub.getCall(0).args[0]).to.equal(START_DATE);
    });

    describe('props.disabled = true', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<DateRangePicker disabled onFocusChange={onFocusChangeStub} />);
        wrapper.instance().onStartDateFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 0);
      });
    });
  });

  describe('#onEndDateFocus', () => {
    it('calls props.onFocusChange once with arg END_DATE', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow(<DateRangePicker onFocusChange={onFocusChangeStub} />);
      wrapper.instance().onEndDateFocus();
      expect(onFocusChangeStub).to.have.property('callCount', 1);
      expect(onFocusChangeStub.getCall(0).args[0]).to.equal(END_DATE);
    });

    describe('props.startDate = moment', () => {
      it('calls props.onFocusChange once with arg END_DATE', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            startDate={moment(today)}
            onFocusChange={onFocusChangeStub}
          />
        );
        wrapper.instance().onEndDateFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 1);
        expect(onFocusChangeStub.getCall(0).args[0]).to.equal(END_DATE);
      });
    });

    describe('props.orientation = VERTICAL_ORIENTATION', () => {
      it('calls props.onFocusChange once with arg START_DATE', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            orientation={VERTICAL_ORIENTATION}
            onFocusChange={onFocusChangeStub}
          />
        );
        wrapper.instance().onEndDateFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 1);
        expect(onFocusChangeStub.getCall(0).args[0]).to.equal(START_DATE);
      });
    });

    describe('props.startDate = moment and props.orientation = VERTICAL_ORIENTATION', () => {
      it('calls props.onFocusChange once with arg END_DATE', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(
          <DateRangePicker
            startDate={moment(today)}
            orientation={VERTICAL_ORIENTATION}
            onFocusChange={onFocusChangeStub}
          />
        );
        wrapper.instance().onEndDateFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 1);
        expect(onFocusChangeStub.getCall(0).args[0]).to.equal(END_DATE);
      });
    });

    describe('props.disabled = true', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow(<DateRangePicker disabled onFocusChange={onFocusChangeStub} />);
        wrapper.instance().onEndDateFocus();
        expect(onFocusChangeStub.callCount).to.equal(0);
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
              <DateRangePicker
                focusedInput={END_DATE}
                startDate={startDate}
                minimumNights={MIN_NIGHTS}
              />
            );
            expect(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(true);
          });

          it('returns false if arg is > props.minimumNights after props.startDate', () => {
            const testDate = moment(startDate).add(MIN_NIGHTS + 1, 'days');
            const wrapper = shallow(
              <DateRangePicker
                focusedInput={END_DATE}
                startDate={startDate}
                minimumNights={MIN_NIGHTS}
              />
            );
            expect(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
        });

        describe('props.focusedInput !== END_DATE', () => {
          it('returns false', () => {
            const testDate = moment(startDate).add(MIN_NIGHTS - 1, 'days');
            const wrapper = shallow(
              <DateRangePicker
                focusedInput={START_DATE}
                startDate={startDate}
                minimumNights={MIN_NIGHTS}
              />
            );
            expect(wrapper.instance().doesNotMeetMinimumNights(testDate)).to.equal(false);
          });
        });
      });
    });

    describe('#isDayAfterHoveredStartDate', () => {
      it('returns true if arg startDate is hovered and arg is the day after the startDate', () => {
        const wrapper = shallow(<DateRangePicker startDate={today} />);
        wrapper.setState({
          hoverDate: today,
        });
        const testDate = moment(today).add(1, 'days');
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(true);
      });

      it('returns false if props.startDate is falsey', () => {
        const testDate = moment(today).add(1, 'days');
        const wrapper = shallow(<DateRangePicker startDate={null} />);
        wrapper.setState({
          hoverDate: today,
        });
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });

      it('returns false if props.endDate is truthy', () => {
        const testDate = moment(today).add(1, 'days');
        const wrapper = shallow(
          <DateRangePicker
            startDate={today}
            endDate={moment(today).add(3, 'days')}
          />
        );
        wrapper.setState({
          hoverDate: today,
        });
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });

      it('returns false if arg is not day after state.hoverDate', () => {
        const wrapper = shallow(<DateRangePicker startDate={today} />);
        wrapper.setState({
          hoverDate: today,
        });
        const testDate = moment(today).add(2, 'days');
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });

      it('returns false if state.hoverDate is not the same as props.startDate', () => {
        const testDate = moment(today).add(1, 'days');
        const wrapper = shallow(<DateRangePicker startDate={today} />);
        wrapper.setState({
          hoverDate: testDate,
        });
        expect(wrapper.instance().isDayAfterHoveredStartDate(testDate)).to.equal(false);
      });
    });

    describe('#isEndDate', () => {
      it('returns true if arg === props.endDate', () => {
        const wrapper = shallow(<DateRangePicker endDate={today} />);
        expect(wrapper.instance().isEndDate(today)).to.equal(true);
      });

      it('returns false if arg !== props.endDate', () => {
        const wrapper = shallow(<DateRangePicker endDate={moment(today).add(1, 'days')} />);
        expect(wrapper.instance().isEndDate(today)).to.equal(false);
      });
    });

    describe('#isHovered', () => {
      it('returns true if arg === state.hoverDate', () => {
        const wrapper = shallow(<DateRangePicker />);
        wrapper.setState({
          hoverDate: today,
        });
        expect(wrapper.instance().isHovered(today)).to.equal(true);
      });

      it('returns false if arg !== state.hoverDate', () => {
        const wrapper = shallow(<DateRangePicker />);
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
          const wrapper = shallow(<DateRangePicker startDate={today} endDate={null} />);
          wrapper.setState({
            hoverDate: moment(today).add(HOVER_DATE_DIFF, 'days'),
          });
          const testDate = moment(today).add(HOVER_DATE_DIFF - 1, 'days');
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(true);
        });

        it('returns true if arg is equal to state.hoverDate', () => {
          const testDate = moment(today).add(3, 'days');
          const wrapper = shallow(<DateRangePicker startDate={today} endDate={null} />);
          wrapper.setState({
            hoverDate: testDate,
          });
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(true);
        });

        it('returns false if arg is < props.startDate', () => {
          const wrapper = shallow(<DateRangePicker startDate={today} endDate={null} />);
          wrapper.setState({
            hoverDate: moment(today).add(3, 'days'),
          });
          const testDate = moment(today).subtract(1, 'days');
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(false);
        });

        it('returns false if arg is > state.hoverDate', () => {
          const hoverDate = moment(today).add(3, 'days');
          const wrapper = shallow(<DateRangePicker startDate={today} endDate={null} />);
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
            <DateRangePicker
              startDate={null}
              endDate={moment(today).add(5, 'days')}
            />
          );
          wrapper.setState({
            hoverDate: today,
          });
          const testDate = moment(endDate).subtract(1, 'days');
          expect(wrapper.instance().isInHoveredSpan(testDate)).to.equal(true);
        });

        it('returns true if arg is equal to state.hoverDate', () => {
          const wrapper = shallow(
            <DateRangePicker
              startDate={null}
              endDate={moment(today).add(5, 'days')}
            />
          );
          wrapper.setState({
            hoverDate: today,
          });
          expect(wrapper.instance().isInHoveredSpan(today)).to.equal(true);
        });

        it('returns false if arg is < state.hoverDate', () => {
          const wrapper = shallow(
            <DateRangePicker
              startDate={null}
              endDate={moment(today).add(5, 'days')}
            />
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
            <DateRangePicker
              startDate={null}
              endDate={endDate}
            />
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
          <DateRangePicker
            startDate={today}
            endDate={endDate}
          />
        );
        const testDate = moment(endDate).subtract(1, 'days');
        expect(wrapper.instance().isInSelectedSpan(testDate)).to.equal(true);
      });

      it('returns false if arg < props.startDate', () => {
        const endDate = moment(today).add(5, 'days');
        const wrapper = shallow(
          <DateRangePicker
            startDate={today}
            endDate={endDate}
          />
        );
        const testDate = moment(today).subtract(1, 'days');
        expect(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });

      it('returns false if arg > props.endDate', () => {
        const endDate = moment(today).add(5, 'days');
        const wrapper = shallow(
          <DateRangePicker
            startDate={today}
            endDate={endDate}
          />
        );
        const testDate = moment(endDate).add(1, 'days');
        expect(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });

      it('returns false if props.startDate === null', () => {
        const wrapper = shallow(
          <DateRangePicker
            startDate={null}
            endDate={moment(today).add(5, 'days')}
          />
        );
        expect(wrapper.instance().isInSelectedSpan(today)).to.equal(false);
      });

      it('returns false if props.endDate === null', () => {
        const wrapper = shallow(
          <DateRangePicker
            startDate={today}
            endDate={null}
          />
        );
        const testDate = moment(today).add(1, 'days');
        expect(wrapper.instance().isInSelectedSpan(testDate)).to.equal(false);
      });
    });

    describe('#isLastInRange', () => {
      let isInSelectedSpanStub;
      beforeEach(() => {
        isInSelectedSpanStub = sinon.stub(DateRangePicker.prototype, 'isInSelectedSpan');
      });

      it('returns true if arg is day before props.endDate and is in the selected span', () => {
        isInSelectedSpanStub.returns(true);
        const wrapper = shallow(
          <DateRangePicker
            endDate={moment(today).add(1, 'days')}
          />
        );
        expect(wrapper.instance().isLastInRange(today)).to.equal(true);
      });

      it('returns false if arg is not in the selected span', () => {
        isInSelectedSpanStub.returns(false);
        const wrapper = shallow(
          <DateRangePicker
            endDate={moment(today).add(1, 'days')}
          />
        );
        expect(wrapper.instance().isLastInRange(today)).to.equal(false);
      });

      it('returns false if arg is not the day before props.endDate', () => {
        isInSelectedSpanStub.returns(true);
        const wrapper = shallow(
          <DateRangePicker
            endDate={moment(today).add(2, 'days')}
          />
        );
        expect(wrapper.instance().isLastInRange(today)).to.equal(false);
      });
    });

    describe('#isStartDate', () => {
      it('returns true if arg === props.startDate', () => {
        const wrapper = shallow(<DateRangePicker startDate={today} />);
        expect(wrapper.instance().isStartDate(today)).to.equal(true);
      });

      it('returns false if arg !== props.startDate', () => {
        const wrapper = shallow(<DateRangePicker startDate={moment(today).add(1, 'days')} />);
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
          sinon.stub(DateRangePicker.prototype, 'doesNotMeetMinimumNights');
      });

      it('returns true if arg is calendar blocked', () => {
        isDayBlockedStub.returns(true);
        isOutsideRangeStub.returns(false);
        doesNotMeetMinimumNightsStub.returns(false);

        const wrapper = shallow(
          <DateRangePicker
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />
        );
        expect(wrapper.instance().isBlocked(today)).to.equal(true);
      });

      it('returns true if arg is out of range', () => {
        isDayBlockedStub.returns(false);
        isOutsideRangeStub.returns(true);
        doesNotMeetMinimumNightsStub.returns(false);

        const wrapper = shallow(
          <DateRangePicker
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />
        );
        expect(wrapper.instance().isBlocked(today)).to.equal(true);
      });

      it('returns true if arg does not meet minimum nights', () => {
        isDayBlockedStub.returns(false);
        isOutsideRangeStub.returns(false);
        doesNotMeetMinimumNightsStub.returns(true);

        const wrapper = shallow(
          <DateRangePicker
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />
        );
        expect(wrapper.instance().isBlocked(today)).to.equal(true);
      });

      it('returns false if arg is not blocked, not out of range, and meets minimum nights', () => {
        isDayBlockedStub.returns(false);
        isOutsideRangeStub.returns(false);
        doesNotMeetMinimumNightsStub.returns(false);

        const wrapper = shallow(
          <DateRangePicker
            isDayBlocked={isDayBlockedStub}
            isOutsideRange={isOutsideRangeStub}
          />
        );
        expect(wrapper.instance().isBlocked(today)).to.equal(false);
      });
    });
  });
});
