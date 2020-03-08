import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import moment from 'moment';

import SingleDatePickerInput from '../../src/components/SingleDatePickerInput';
import SingleDatePickerInputController from '../../src/components/SingleDatePickerInputController';

import isSameDay from '../../src/utils/isSameDay';

// Set to noon to mimic how days in the picker are configured internally
const today = moment().startOf('day').hours(12);

describe('SingleDatePickerInputController', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('renders a SingleDatePickerInput', () => {
    const wrapper = shallow((
      <SingleDatePickerInputController
        id="date"
        onDateChange={() => {}}
        onFocusChange={() => {}}
      />
    ));
    expect(wrapper.find(SingleDatePickerInput)).to.have.lengthOf(1);
  });

  it('should pass children to the SingleDatePickerInput', () => {
    const Child = () => <div>CHILD</div>;

    const wrapper = shallow((
      <SingleDatePickerInputController id="date">
        <Child />
      </SingleDatePickerInputController>));

    expect(wrapper.find(SingleDatePickerInput)).to.have.property('children');
    expect(wrapper.find(Child)).to.have.lengthOf(1);
  });

  describe('#onChange', () => {
    describe('valid future date string', () => {
      const futureDateString = moment().add(10, 'days').format('YYYY-MM-DD');
      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />
        ));
        wrapper.instance().onChange(futureDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with date as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />
        ));
        wrapper.instance().onChange(futureDateString);
        const newDate = onDateChangeStub.getCall(0).args[0];
        expect(isSameDay(newDate, moment(futureDateString))).to.equal(true);
      });

      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
        ));
        wrapper.instance().onChange(futureDateString);
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
        ));
        wrapper.instance().onChange(futureDateString);
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });

      it('calls props.onClose once', () => {
        const onCloseStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            onClose={onCloseStub}
          />
        ));
        wrapper.instance().onChange(futureDateString);
        expect(onCloseStub.callCount).to.equal(1);
      });

      it('calls props.onClose with { date } as arg', () => {
        const onCloseStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            onDateChange={() => {}}
            onFocusChange={() => {}}
            onClose={onCloseStub}
          />
        ));
        wrapper.instance().onChange(futureDateString);
        const newDate = onCloseStub.getCall(0).args[0].date;
        expect(isSameDay(newDate, moment(futureDateString))).to.equal(true);
      });
    });

    describe('matches custom display format', () => {
      const customFormat = 'YY|MM[foobar]DD';
      const customFormatDateString = moment().add(5, 'days').format(customFormat);
      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            displayFormat={customFormat}
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
          />
        ));
        wrapper.instance().onChange(customFormatDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with date as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            displayFormat={customFormat}
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
          />
        ));
        wrapper.instance().onChange(customFormatDateString);
        const formattedFirstArg = onDateChangeStub.getCall(0).args[0].format(customFormat);
        expect(formattedFirstArg).to.equal(customFormatDateString);
      });

      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            displayFormat={customFormat}
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
          />
        ));
        wrapper.instance().onChange(customFormatDateString);
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            displayFormat={customFormat}
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
          />
        ));
        wrapper.instance().onChange(customFormatDateString);
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
    });

    describe('invalid date string', () => {
      const invalidDateString = 'foobar';
      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />
        ));
        wrapper.instance().onChange(invalidDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with null as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />
        ));
        wrapper.instance().onChange(invalidDateString);
        expect(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });

      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
        ));
        wrapper.instance().onChange(invalidDateString);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('date string outside range', () => {
      const isOutsideRangeStub = sinon.stub().returns(true);
      const todayDateString = today.format('DD/MM/YYYY');

      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
            isOutsideRange={isOutsideRangeStub}
          />
        ));
        wrapper.instance().onChange(todayDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with null as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
            isOutsideRange={isOutsideRangeStub}
          />
        ));
        wrapper.instance().onChange(todayDateString);
        expect(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });

      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            isOutsideRange={isOutsideRangeStub}
          />
        ));
        wrapper.instance().onChange(todayDateString);
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('date string is blocked', () => {
      const isDayBlocked = sinon.stub().returns(true);
      const todayDateString = today.format('DD/MM/YYYY');

      it('calls props.onDateChange once', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
            isDayBlocked={isDayBlocked}
          />
        ));
        wrapper.instance().onChange(todayDateString);
        expect(onDateChangeStub.callCount).to.equal(1);
      });

      it('calls props.onDateChange with null as arg', () => {
        const onDateChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            onDateChange={onDateChangeStub}
            onFocusChange={() => {}}
            isDayBlocked={isDayBlocked}
          />
        ));
        wrapper.instance().onChange(todayDateString);
        expect(onDateChangeStub.getCall(0).args[0]).to.equal(null);
      });
    });
  });

  describe('#onFocus', () => {
    it('calls props.onFocusChange once', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <SingleDatePickerInputController id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
      ));
      wrapper.instance().onFocus();
      expect(onFocusChangeStub.callCount).to.equal(1);
    });

    it('calls props.onFocusChange with { focused: true } as arg', () => {
      const onFocusChangeStub = sinon.stub();
      const wrapper = shallow((
        <SingleDatePickerInputController id="date" onDateChange={() => {}} onFocusChange={onFocusChangeStub} />
      ));
      wrapper.instance().onFocus();
      expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(true);
    });

    describe('props.disabled = true', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            disabled
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
          />
        ));
        wrapper.instance().onFocus();
        expect(onFocusChangeStub).to.have.property('callCount', 0);
      });
    });
  });

  describe('#onClearFocus', () => {
    describe('props.focused = false', () => {
      it('does not call props.onFocusChange', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused={false}
          />
        ));
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.callCount).to.equal(0);
      });
    });

    describe('props.focused = true', () => {
      it('calls props.onFocusChange once', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused
          />
        ));
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.callCount).to.equal(1);
      });

      it('calls props.onFocusChange with { focused: false } as arg', () => {
        const onFocusChangeStub = sinon.stub();
        const wrapper = shallow((
          <SingleDatePickerInputController
            id="date"
            onDateChange={() => {}}
            onFocusChange={onFocusChangeStub}
            focused
          />
        ));
        wrapper.instance().onClearFocus();
        expect(onFocusChangeStub.getCall(0).args[0].focused).to.equal(false);
      });
    });
  });

  describe('#clearDate', () => {
    describe('props.reopenPickerOnClearDate is truthy', () => {
      describe('props.onFocusChange', () => {
        it('is called once', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <SingleDatePickerInputController
              id="date"
              onDateChange={() => {}}
              onFocusChange={onFocusChangeStub}
              reopenPickerOnClearDate
            />
          ));
          wrapper.instance().clearDate();
          expect(onFocusChangeStub.callCount).to.equal(1);
        });
      });
    });

    describe('props.reopenPickerOnClearDate is falsy', () => {
      describe('props.onFocusChange', () => {
        it('is not called', () => {
          const onFocusChangeStub = sinon.stub();
          const wrapper = shallow((
            <SingleDatePickerInputController
              id="date"
              onDateChange={() => {}}
              onFocusChange={onFocusChangeStub}
            />
          ));
          wrapper.instance().clearDate();
          expect(onFocusChangeStub.callCount).to.equal(0);
        });
      });
    });

    it('calls props.onDateChange with null date', () => {
      const onDateChangeStub = sinon.stub();
      const wrapper = shallow((
        <SingleDatePickerInputController id="date" onDateChange={onDateChangeStub} onFocusChange={() => {}} />
      ));
      wrapper.instance().clearDate();
      expect(onDateChangeStub.callCount).to.equal(1);
    });
  });
});
