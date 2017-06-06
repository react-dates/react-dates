import PropTypes from 'prop-types';

import {
  START_DATE,
  END_DATE,
} from '../../constants';

export default function(props, propName, componentName){
  const item = props[propName];
  if (item === START_DATE || item === END_DATE || item === ''){
    return null;
  }
  return new Error(`${propName} must be an empty string, "${START_DATE}", or "${END_DATE}"`);
}