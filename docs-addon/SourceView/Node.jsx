import React, { PropTypes } from 'react';
import Props from './Props';

import codeStyles from './codeStyles';

const propTypes = {
  node: PropTypes.node.isRequired,
  depth: PropTypes.number,
};

const defaultProps = {
  depth: 0,
};

const leftWidth = 24;

function getWrappedName(name) {
  // If it's an HOC, we want the wrapped component name:
  if (name.includes('(')) {
    return name.slice(name.lastIndexOf('(') + 1, name.indexOf(')'));
  }
  return name;
}

function getData(element) {
  const data = {
    name: null,
    text: null,
    children: null,
  };

  if (typeof element === 'string') {
    return { ...data, text: element };
  }

  data.children = element.props.children;

  if (typeof element.type === 'string') {
    return {
      ...data,
      name: element.type,
    };
  }

  return {
    ...data,
    name: getWrappedName(element.type.displayName || element.type.name || 'Component'),
  };
}

export default function Node({ node, depth }) {
  const dynamicStyles = {
    container: {
      paddingLeft: depth * leftWidth,
      paddingRight: 8,
    },
  };

  const { name, text, children } = getData(node);

  // Just text
  if (!name) {
    return (
      <div style={dynamicStyles.container}>
        <span style={codeStyles.content}>{text}</span>
      </div>
    );
  }

  // Single-line tag
  if (!children) {
    return (
      <div style={dynamicStyles.container}>
        <span style={codeStyles.brace}>{'<'}</span>
        <span style={codeStyles.component}>{name}</span>
        <Props node={node} singleLine />
        <span style={codeStyles.brace}>{'/>'}</span>
      </div>
    );
  }

  return (
    <div>
      <div style={dynamicStyles.container}>
        <span style={codeStyles.brace}>{'<'}</span>
        <span style={codeStyles.component}>{name}</span>
        <Props node={node} />
        <span style={codeStyles.brace}>{'>'}</span>
      </div>
      {React.Children.map(children, childElement => (
        <Node node={childElement} depth={depth + 1} />
      ))}
      <div style={dynamicStyles.container}>
        <span style={codeStyles.brace}>{'</'}</span>
        <span style={codeStyles.component}>{name}</span>
        <span style={codeStyles.brace}>{'>'}</span>
      </div>
    </div>
  );
}

Node.propTypes = propTypes;
Node.defaultProps = defaultProps;
