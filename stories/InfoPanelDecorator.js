import React from 'react';
import PropTypes from 'prop-types';

export function monospace(text) {
  return `<span style="font-family:monospace;background:#f7f7f7">${text}</span>`;
}

function InfoPanel({ text }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        fontColor: '#3c3f40',
        fontSize: 14,
        margin: '8px 0',
        padding: 16,
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

InfoPanel.propTypes = {
  text: PropTypes.string.isRequired,
};

export default function InfoPanelDecorator(text) {
  return story => (
    <div>
      <InfoPanel text={text} />
      {story()}
    </div>
  );
}
