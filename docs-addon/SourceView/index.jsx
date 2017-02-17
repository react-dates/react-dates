import React, { PropTypes } from 'react';

import Node from './Node';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  code: {
    backgroundColor: '#1B2B34',
    color: '#fff',
    padding: 16,
    margin: `${24}px 0`,
    whiteSpace: 'pre-wrap',
  },
};

export default function SourceView({ children }) {
  return (
    <div title="Story Source">
      <pre style={styles.code}>
        {React.Children.map(children, (root, idx) => (
          <Node key={idx} depth={0} node={root} />
        ))}
      </pre>
    </div>
  );
}

SourceView.propTypes = propTypes;
