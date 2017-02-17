/* eslint react/no-array-index-key: 1 */

import React, { PropTypes } from 'react';
import codeStyles from './codeStyles';

const propTypes = {
  val: PropTypes.any,
  braceWrap: PropTypes.bool,
};

const styles = {
  stringBreak: {
    wordBreak: 'break-word',
  },
};

function previewArray(val, withPropTypes) {
  const items = [];
  val.slice(0, 3).forEach((item, i) => {
    items.push(
      <PropValue key={`propValue${i}`} val={item} withPropTypes={withPropTypes} />,
      <span key={`comma${i}`}>, </span>,
    );
  });

  if (val.length > 3) {
    items.push(<span key="dotdotdot">…</span>);
  } else {
    items.pop();
  }

  return (
    <span style={codeStyles.array}>
      {'[ '}{items}{' ]'}
    </span>
  );
}

function previewObject(val, withPropTypes) {
  const names = Object.keys(val);
  const items = [];
  names.slice(0, 3).forEach((name, i) => {
    items.push(
      <span key={`name${i}`} style={codeStyles.attr}>{name}</span>,
      <span key={`sep${i}`}>: </span>,
      <PropValue key={`propvalue${i}`} val={val[name]} withPropTypes={withPropTypes} />,
      <span key={`comma${i}`}>, </span>,
    );
  });

  if (names.length > 3) {
    items.push(<span key="dotdotdot">…</span>);
  } else {
    items.pop();
  }

  return (
    <span style={codeStyles.object}>
      {'{ '}{items}{' }'}
    </span>
  );
}

function previewProp(val, withBraceWrap, withPropTypes) {
  let braceWrap = true;
  let content = null;
  if (typeof val === 'number') {
    content = <span style={codeStyles.number}>{val}</span>;
  } else if (typeof val === 'string') {
    let slicedVal = val;
    if (slicedVal.length > 50) {
      slicedVal = `${val.slice(0, 50)}…`;
    }
    content = <span style={codeStyles.string, styles.stringBreak}>{`"${slicedVal}"`}</span>;
    braceWrap = false;
  } else if (typeof val === 'boolean') {
    content = <span style={codeStyles.bool}>{`${val}`}</span>;
  } else if (Array.isArray(val)) {
    content = previewArray(val, withPropTypes);
  } else if (typeof val === 'function') {
    // PropTypes can be displayed better if we have the annotated package:
    if (withPropTypes && val.typeName) {
      content = (
        <span style={codeStyles.func}>
          {val.typeName}
        </span>
      );
    } else {
      const name = val.displayName || val.name;
      content = (
        <span style={codeStyles.func}>
          {name ? `${name}()` : 'anonymous()'}
        </span>
      );
    }
  } else if (!val) {
    content = <span style={codeStyles.empty}>{`${val}`}</span>;
  } else if (typeof val !== 'object') {
    content = <span>…</span>;
  } else if (React.isValidElement(val)) {
    content = (
      <span style={codeStyles.component}>
        <span style={codeStyles.brace}>{'<'}</span>
        <span style={codeStyles.component}>
          {val.type.displayName || val.type.name || val.type}
        </span>
        <span style={codeStyles.brace}>{' />'}</span>
      </span>
    );
  } else {
    content = previewObject(val, withPropTypes);
  }

  if (!braceWrap || !withBraceWrap) return content;
  return <span>&#123;{content}&#125;</span>;
}

export default function PropValue({ val, braceWrap = false, withPropTypes = false }) {
  return previewProp(val, braceWrap, withPropTypes);
}

PropValue.propTypes = propTypes;
