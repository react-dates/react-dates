import React, { PropTypes } from 'react';
import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener, removeEventListener } from 'consolidated-events';

const propTypes = {
  children: PropTypes.node,
  onOutsideClick: PropTypes.func,
};

const defaultProps = forbidExtraProps({
  children: <span />,
  onOutsideClick: () => {},
});

export default class OutsideClickHandler extends React.Component {
  constructor(props) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    // `capture` flag is set to true so that a `stopPropagation` in the children
    // will not prevent all outside click handlers from firing - maja
    this.clickHandle = addEventListener(
      document,
      'click',
      this.onOutsideClick,
      { capture: true },
    );
  }

  componentWillUnmount() {
    removeEventListener(this.clickHandle);
  }

  onOutsideClick(e) {
    const isDescendantOfRoot = this.childNode.contains(e.target);
    if (!isDescendantOfRoot) {
      this.props.onOutsideClick(e);
    }
  }

  render() {
    return (
      <div ref={(ref) => { this.childNode = ref; }}>
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;
