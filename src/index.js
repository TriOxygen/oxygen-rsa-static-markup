//@flow
import * as React from 'react';
import addons from '@storybook/addons';
import pretty from 'pretty';
import Prism from 'prismjs';
import ReactDOMServer from 'react-dom/server';

export const StaticMarkup = ({ children }) => {
  const html = pretty(ReactDOMServer.renderToStaticMarkup(children));
  const markup = Prism.highlight(html, Prism.languages.javascript, 'html');
  const channel = addons.getChannel();
  channel.emit('TriOxygen/static-markup/show-markup', markup);
  return children;
};

export default {
  addWithStaticMarkup(storyName, story) {
    this.add(storyName, () => <StaticMarkup>{story()}</StaticMarkup>);
  },
};
