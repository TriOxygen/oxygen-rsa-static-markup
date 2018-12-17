//@flow
import * as React from 'react';
import addons from '@storybook/addons';
import './theme';

const styles = {
  markupPanel: {
    fontFamily: 'monospace',
    whiteSpace: 'pre',
    width: '100%',
    overflow: 'auto',
  },
};

type PropsType = {
  channel: {
    on: (string, () => void) => void,
  },
  api: {
    onStory: (() => void) => void,
  },
  active: boolean,
};

class StaticMarkup extends React.Component<PropsType> {
  state = {
    markup: '',
  };

  componentDidMount() {
    const { channel, api } = this.props;
    channel.on('TriOxygen/static-markup/show-markup', this.onShowStaticMarkup);

    // Clear the current state on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onShowStaticMarkup('');
    });
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel } = this.props;
    channel.removeListener('TriOxygen/static-markup/show-markup', this.onShowStaticMarkup);
  }

  onShowStaticMarkup = (markup) => {
    this.setState({ markup });
  };

  render() {
    const {
      state: { markup },
      props: { active },
    } = this;
    if (!active) return null;
    return <div style={styles.markupPanel} dangerouslySetInnerHTML={{ __html: markup }} />;
  }
}

type PanelPropsType = {
  active: boolean,
};

addons.register('TriOxygen/static-markup', (api) => {
  const Panel = ({ active }: PanelPropsType) => (
    <StaticMarkup channel={addons.getChannel()} api={api} active={active} />
  );
  addons.addPanel('TriOxygen/static-markup/panel', {
    title: 'Static Markup',
    render: Panel,
  });
});
