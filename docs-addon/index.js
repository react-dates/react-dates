import addons from '@kadira/storybook-addons';
import { PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';

const PropTypesMap = new Map();
Object.keys(PropTypes).forEach((typeName) => {
  const type = PropTypes[typeName];
  PropTypesMap.set(type, typeName);
  PropTypesMap.set(type.isRequired, typeName);
});

function stringifyProps(props) {
  const stringProps = {};
  Object.keys(props).forEach((prop) => {
    const value = props[prop];

    if (typeof value === 'function') {
      let stringValue = String(value);
      stringValue = stringValue.replace(/(\n)/gm, ' ').replace(/(  )/gm, '');
      stringValue = stringValue.replace(/(_)/gm, '').replace(/(2\['default'\])/gm, '()');
      stringProps[prop] = stringValue;
      return;
    }

    stringProps[prop] = value;
  });

  return stringProps;
}

export default {
  addWithDocs(storyName, storyFn, options) {
    const channel = addons.getChannel();

    return this.add(storyName, (context) => {
      const story = storyFn(context);
      const { props, type } = story;

      const propTypes = {};
      Object.keys(type.propTypes).forEach((typeName) => {
        const typeInfo = type.propTypes[typeName];
        propTypes[typeName] = {
          type: PropTypesMap.get(typeInfo) || 'other',
          isRequired: typeInfo.isRequired === undefined ? 'yes' : 'no',
        };
      });

      channel.emit('kadira/docs/add_docs', {
        ...options,
        context,
        componentName: type.name,
        props: stringifyProps(props),
        defaultProps: stringifyProps(type.defaultProps),
        propTypes,
        markup: ReactDOMServer.renderToStaticMarkup(story),
      });

      return storyFn(context);
    });
  },
};
