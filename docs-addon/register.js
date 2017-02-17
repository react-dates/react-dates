import React from 'react';
import shallowequal from 'shallowequal';
import addons from '@kadira/storybook-addons';

const styles = {
  container: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    padding: 24,
  },
  headerTitle: {
    marginBottom: 0,
  },
  headerSubtitle: {
    fontWeight: 'normal',
    fontSize: 20,
    color: '#484848',
    margin: '8px 0',
  },
  horizontalRule: {
    textAlign: 'left',
    marginLeft: 0,
    margin: '24px 0',
    color: '#484848',
    width: 100,
  },
  paragraph: {
    margin: '16px 0',
  },

  sourceView: {
    fontSize: 12,
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    background: '#fafafa',
    padding: 16,
    lineHeight: 1.5,
    overflowX: 'scroll',
  },

  propTable: {
    textAlign: 'left',
  },

  propTableCell: {
    padding: 8,
  },
};

class Documentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      usage: '',
      context: null,
      story: null,
    };

    this.onStory = this.onStory.bind(this);
  }

  componentDidMount() {
    const { channel, api } = this.props;
    channel.on('kadira/docs/add_docs', this.onStory);

    this.stopListeningOnStory = api.onStory(() => {
      this.onStory({
        description: '',
        usage: '',
        context: null,
        story: null,
      });
    });
  }

  componentWillUnmount() {
    const { channel, api } = this.props;
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    channel.removeListener('kadira/docs/add_docs', this.onStory);
  }

  onStory(options) {
    console.log('onStory', options.componentName);
    this.setState(options);
  }

  getPropString(prop, value) {
    if (value === true) return prop;

    if (typeof value === 'string') return `${prop}="${value}"`;

    return `${prop}={${value}}`;
  }

  renderSource() {
    const { componentName, defaultProps, props } = this.state;

    const definedProps = props && Object.keys(props).filter((prop) => {
      const value = props[prop];
      return value !== false && value !== undefined && !shallowequal(value, defaultProps[prop]);
    });

    const hasDefinedProps = defaultProps.length > 0;

    return (
      <div style={styles.sourceView}>
        &lt;{componentName} {hasDefinedProps && <br />}
        {definedProps.map((prop) => {
          const value = props[prop];
          if (value === false || value === undefined || value === defaultProps[prop]) return null;

          return (
            <div key={prop}>
              &nbsp;&nbsp;{this.getPropString(prop, value)}
            </div>
          );
        })}
        /&gt;
      </div>
    );
  }

  renderPropTable() {
    const { defaultProps, props, propTypes } = this.state;
    return (
      <table style={styles.propTable}>
        <tbody>
          <tr>
            <th>Prop</th>
            <th>Prop Type</th>
            <th>Required</th>
            <th>Default Value</th>
          </tr>

          {Object.keys(props).map((prop) => {
            return (
              <tr key={prop}>
                <td style={styles.propTableCell}>{prop}</td>
                <td style={styles.propTableCell}>{propTypes[prop].type}</td>
                <td style={styles.propTableCell}>{propTypes[prop].isRequired}</td>
                <td style={styles.propTableCell}>{JSON.stringify(defaultProps[prop])}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const { description, usage, context } = this.state;

    if (!context) return null;

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>{context.kind}</h1>
          <h2 style={styles.headerSubtitle}>{context.story}</h2>
          <hr style={styles.horizontalRule} />
        </div>

        <div style={styles.paragraph} dangerouslySetInnerHTML={{ __html: description }} />

        <div style={styles.paragraph} dangerouslySetInnerHTML={{ __html: usage }} />

        <div>
          <h2>Source</h2>
          {this.renderSource()}
        </div>

        <div style={styles.props}>
          <h2>Prop Types</h2>
          {this.renderPropTable()}
        </div>
      </div>
    );
  }
}

addons.register('kadira/docs', (api) => {
  addons.addPanel('kadira/docs/panel', {
    title: 'Documentation',
    render: () => (
      <Documentation channel={addons.getChannel()} api={api} />
    ),
  });
});
