import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

const propTypes = {
  children: PropTypes.node,
  onOutsideClick: PropTypes.func,
};

const defaultProps = {
  children: <span />,
  onOutsideClick: () => {},
};

export default class OutsideClickHandler extends React.Component {
  constructor(props) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    if (document.addEventListener) {
      // `useCapture` flag is set to true so that a `stopPropagation` in the children will
      // not prevent all outside click handlers from firing - maja
      document.addEventListener('click', this.onOutsideClick, true);
    } else {
      document.attachEvent('onclick', this.onOutsideClick);
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      document.removeEventListener('click', this.onOutsideClick, true);
    } else {
      document.detachEvent('onclick', this.onOutsideClick);
    }
  }

  onOutsideClick(e) {
    const isDescendantOfRoot = ReactDOM.findDOMNode(this.refs.childNode).contains(e.target);
    if (!isDescendantOfRoot) {
      this.props.onOutsideClick(e);
    }
  }

  render() {
    return (
      <div ref="childNode">
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;
