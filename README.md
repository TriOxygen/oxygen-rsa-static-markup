[![npm version](https://badge.fury.io/js/oxygen-rsa-static-markup.svg)](https://badge.fury.io/js/oxygen-rsa-static-markup)

# Static Markup addon for [React Storybook](https://github.com/storybooks/react-storybook)

Displays a panel with an "html version" of a story, as suggested in [this](https://github.com/storybooks/react-storybook/issues/617) thread. (Based on [https://github.com/evgenykochetkov/react-storybook-addon-static-markup](https://github.com/evgenykochetkov/react-storybook-addon-static-markup))

## Installation

Install the package:

```sh
npm i -D oxygen-rsa-static-markup
```

or

```sh
yarn add oxygen-rsa-static-markup --dev
```

Register it in your `.storybook/addons.js`:

```js
import 'oxygen-rsa-static-markup/lib/register';
```

## Usage

```js
import React from 'react';
import { storiesOf } from '@storybook/react';

import { StaticMarkup } from 'oxygen-rsa-static-markup';

storiesOf('Usage examples', module).add('with HOC', () => (
  <StaticMarkup>
    <button className="foo bar baz">hello!</button>
  </StaticMarkup>
));
```
