import React from 'react';
import moment from 'moment';

import isDayVisible from '../utils/isDayVisible';
import toISODateString from '../utils/toISODateString';
import toISOMonthString from '../utils/toISOMonthString';

import getVisibleDays from '../utils/getVisibleDays';

import {
  VERTICAL_SCROLLABLE,
} from '../../constants';

export default function withModifiers(modifiersThunk) {
  return function withModifiersHOC(WrappedComponent) {
    class withModifiers extends React.Component { // eslint-disable-line no-shadow
      constructor(props) {
        super(props);

        this.modifiers = modifiersThunk(props, {});

        this.today = moment();
        const { currentMonth, visibleDays } = this.getStateForNewMonth(props);

        this.state = {
          currentMonth,
          visibleDays,
        };

        this.addModifier = this.addModifier.bind(this);
        this.deleteModifier = this.deleteModifier.bind(this);
        this.getStateForNewMonth = this.getStateForNewMonth.bind(this);
        this.getModifiers = this.getModifiers.bind(this);
        this.updateModifiers = this.updateModifiers.bind(this);

        this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
        this.onNextMonthClick = this.onNextMonthClick.bind(this);
      }

      componentWillReceiveProps(nextProps) {
        const {
          initialVisibleMonth,
          numberOfMonths,
          enableOutsideDays,
        } = nextProps;

        if (
          initialVisibleMonth !== this.props.initialVisibleMonth ||
          numberOfMonths !== this.props.numberOfMonths ||
          enableOutsideDays !== this.props.enableOutsideDays
        ) {
          const newMonthState = this.getStateForNewMonth(nextProps);
          const currentMonth = newMonthState.currentMonth;
          const visibleDays = newMonthState.visibleDays;
          this.setState({
            currentMonth,
            visibleDays,
          });
        }
      }

      getModifiers(visibleDays) {
        const modifiers = {};
        Object.keys(visibleDays).forEach((month) => {
          modifiers[month] = {};
          visibleDays[month].forEach((day) => {
            modifiers[month][toISODateString(day)] = this.getModifiersForDay(day);
          });
        });

        return modifiers;
      }

      getModifiersForDay(day) {
        return new Set(Object.keys(this.modifiers).filter(modifier => this.modifiers[modifier](day)));
      }

      getStateForNewMonth(nextProps) {
        const { initialVisibleMonth, date, numberOfMonths, enableOutsideDays } = nextProps;
        const initialVisibleMonthThunk = initialVisibleMonth || (date ? () => date : () => this.today);
        const currentMonth = initialVisibleMonthThunk();
        const visibleDays =
          this.getModifiers(getVisibleDays(currentMonth, numberOfMonths, enableOutsideDays));
        return { currentMonth, visibleDays };
      }

      addModifier(updatedDays, day, modifier) {
        const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = this.props;
        const { currentMonth: firstVisibleMonth, visibleDays } = this.state;

        let currentMonth = firstVisibleMonth;
        let numberOfMonths = numberOfVisibleMonths;
        if (orientation !== VERTICAL_SCROLLABLE) {
          currentMonth = currentMonth.clone().subtract(1, 'month');
          numberOfMonths += 2;
        }
        if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
          return updatedDays;
        }

        const iso = toISODateString(day);

        let updatedDaysAfterAddition = { ...updatedDays };
        if (enableOutsideDays) {
          const monthsToUpdate = Object.keys(visibleDays).filter(monthKey => (
            Object.keys(visibleDays[monthKey]).indexOf(iso) > -1
          ));

          updatedDaysAfterAddition = monthsToUpdate.reduce((days, monthIso) => {
            const month = updatedDays[monthIso] || visibleDays[monthIso];
            const modifiers = new Set(month[iso]);
            modifiers.add(modifier);
            return {
              ...days,
              [monthIso]: {
                ...month,
                [iso]: modifiers,
              },
            };
          }, updatedDaysAfterAddition);
        } else {
          const monthIso = toISOMonthString(day);
          const month = updatedDays[monthIso] || visibleDays[monthIso];

          const modifiers = new Set(month[iso]);
          modifiers.add(modifier);
          updatedDaysAfterAddition = {
            ...updatedDaysAfterAddition,
            [monthIso]: {
              ...month,
              [iso]: modifiers,
            },
          };
        }

        return updatedDaysAfterAddition;
      }

      deleteModifier(updatedDays, day, modifier) {
        const { numberOfMonths: numberOfVisibleMonths, enableOutsideDays, orientation } = this.props;
        const { currentMonth: firstVisibleMonth, visibleDays } = this.state;

        let currentMonth = firstVisibleMonth;
        let numberOfMonths = numberOfVisibleMonths;
        if (orientation !== VERTICAL_SCROLLABLE) {
          currentMonth = currentMonth.clone().subtract(1, 'month');
          numberOfMonths += 2;
        }
        if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
          return updatedDays;
        }

        const iso = toISODateString(day);

        let updatedDaysAfterDeletion = { ...updatedDays };
        if (enableOutsideDays) {
          const monthsToUpdate = Object.keys(visibleDays).filter(monthKey => (
            Object.keys(visibleDays[monthKey]).indexOf(iso) > -1
          ));

          updatedDaysAfterDeletion = monthsToUpdate.reduce((days, monthIso) => {
            const month = updatedDays[monthIso] || visibleDays[monthIso];
            const modifiers = new Set(month[iso]);
            modifiers.delete(modifier);
            return {
              ...days,
              [monthIso]: {
                ...month,
                [iso]: modifiers,
              },
            };
          }, updatedDaysAfterDeletion);
        } else {
          const monthIso = toISOMonthString(day);
          const month = updatedDays[monthIso] || visibleDays[monthIso];

          const modifiers = new Set(month[iso]);
          modifiers.delete(modifier);
          updatedDaysAfterDeletion = {
            ...updatedDaysAfterDeletion,
            [monthIso]: {
              ...month,
              [iso]: modifiers,
            },
          };
        }

        return updatedDaysAfterDeletion;
      }

      updateModifiers(newModifiers) {
        this.setState({ visibleDays: newModifiers });
      }

      onPrevMonthClick() {
        const {
          onPrevMonthClick,
          numberOfMonths,
          enableOutsideDays,
        } = this.props;
        const { currentMonth, visibleDays } = this.state;

        const newVisibleDays = {};
        Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach((month) => {
          newVisibleDays[month] = visibleDays[month];
        });

        const prevMonth = currentMonth.clone().subtract(1, 'month');
        const prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays);

        this.setState({
          currentMonth: prevMonth,
          visibleDays: {
            ...newVisibleDays,
            ...this.getModifiers(prevMonthVisibleDays),
          },
        });

        onPrevMonthClick();
      }

      onNextMonthClick() {
        const {
          onNextMonthClick,
          numberOfMonths,
          enableOutsideDays,
        } = this.props;
        const { currentMonth, visibleDays } = this.state;

        const newVisibleDays = {};
        Object.keys(visibleDays).sort().slice(1).forEach((month) => {
          newVisibleDays[month] = visibleDays[month];
        });

        const nextMonth = currentMonth.clone().add(numberOfMonths, 'month');
        const nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays);

        this.setState({
          currentMonth: currentMonth.clone().add(1, 'month'),
          visibleDays: {
            ...newVisibleDays,
            ...this.getModifiers(nextMonthVisibleDays),
          },
        });

        onNextMonthClick();
      }

      render() {
        const { currentMonth, visibleDays } = this.state;
        return (
          <WrappedComponent
            {...this.props}
            currentMonth={currentMonth}
            visibleDays={visibleDays}
            modifiers={this.modifiers}
            addModifier={this.addModifier}
            addModifierToRange={this.addModifierToRange}
            deleteModifier={this.deleteModifier}
            deleteModifierFromRange={this.deleteModifierFromRange}
            getStateForNewMonth={this.getStateForNewMonth}
            getModifiers={this.getModifiers}
            onPrevMonthClick={this.onPrevMonthClick}
            onNextMonthClick={this.onNextMonthClick}
            updateModifiers={this.updateModifiers}
          />
        );
      }
    }

    return withModifiers;
  };
}
