import React, {PropTypes} from 'react';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

export default class MenuMonthYear extends React.Component {
  constructor(props) {
    super(props);

    this.renderMonths = this.renderMonths.bind(this);
    this.renderYears = this.renderYears.bind(this);
  }

  renderMonths(value) {

    const options = [];

    for (var month = 1; month <= 12; month++) {

      const monthName = moment(month,"M").format("MMMM");

      options.push(<option key={month} value={month}>{monthName}</option>);
    }

    // let valueMonth = 1;
    // let valueYear = 2016;
    //
    // if (typeof(this.refs.month) != 'undefined' && typeof(this.refs.year) != 'undefined') {
    //   valueMonth = this.refs.month.value;
    //   valueYear = this.refs.year.value;
    // }

    return <select onChange={this.props.onMenuChangeYearMonth} ref="month" value={value} name="month">{options}</select>;
  }

  renderYears(value) {
      const options = [];

      for (var year = 1900; year <= 2050; year++) {

        options.push(<option key={year} value={year}>{year}</option>);
      }

      // let valueMonth = 1;
      // let valueYear = 2016;
      //
      // if (typeof(this.refs.month) != 'undefined' && typeof(this.refs.year) != 'undefined') {
      //   valueMonth = this.refs.month.value;
      //   valueYear = this.refs.year.value;
      // }

      return <select onChange={this.props.onMenuChangeYearMonth} ref="year" value={value} name="year">{options}</select>;
    }

    render() {

      const month = this.props.date.format("M");
      const year = this.props.date.format("YYYY");

      const months = this.renderMonths(month);
      const years = this.renderYears(year);

      return (<div>{months}{years}</div>);
    }
  }

MenuMonthYear.propTypes = {
  date: momentPropTypes.momentObj
};
