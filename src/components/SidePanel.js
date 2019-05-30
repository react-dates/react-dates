import React, { Component } from 'react'
import { Div } from '@drifthq/tide-core'
import moment from 'moment'

const BUTTON_TYPES = {
  LAST_SEVEN: {
    buttonText: 'Last 7 days',
    range = [moment().subtract(7), 'days', moment()]
  },
  LAST_THIRTY: {
    buttonText: 'Last 30 days',
    range = [moment().subtract(10), 'days', moment()]
  },
  LAST_THREE_MONTHS : {
    buttonText: 'Last 3 months',
    range = [moment().subtract(3), 'months', moment()]
  },
  CUSTOM : {
    buttonText: 'Custom...',
  }
}

class SidePanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected = BUTTON_TYPES.CUSTOM,
      startDate = props.startDate,
      endDate = props.endDate,
    }
  }

  onSelectCustomRange = () => {
    const { startDate, endDate } = this.state
  }

  onSelectRange = (range) => {
    if (!range) {
      return this.onSelectCustomRange()
    }
  }

  renderButtonComponent = (buttonText, isSelected, range) => {
    <Div className={""}
      onClick={() => onSelectRange(range)}
    >
    {buttonText}
    </Div>
  }

  render() {
    return (
      <Div>
        
        <Div></Div>
        <Div></Div>
        <Div></Div>
      </Div>

    )
  }
}

export default SidePanel