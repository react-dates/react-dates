import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UIIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHover: false,
    }
    this.onMouseEnter = this._onMouseEnter.bind(this)
    this.onMouseLeave = this._onMouseLeave.bind(this)
  }

  _onMouseEnter() {
    const { isHover } = this.state
    if (!isHover) {
      this.setState({
        isHover: true,
      })
    }
  }

  _onMouseLeave() {
    const { isHover } = this.state
    if (isHover) {
      this.setState({
        isHover: false,
      })
    }
  }

  render() {
    const {
      icon,
      className,
      color,
      hoverColor,
      style,
    } = this.props

    const { isHover } = this.state

    const iconColor = isHover
      ? hoverColor
        ? hoverColor
        : color
      : color

    const iconComponent = icon(iconColor)

    return (
      <span
        style={style}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {iconComponent}
      </span>
    )
  }
}

UIIcon.propTypes = {
  icon: PropTypes.func.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  style: PropTypes.object,
}
UIIcon.defaultProps = {
  className: '',
  color: 'black',
  hoverColor: '',
  style: {},
}

export default UIIcon
