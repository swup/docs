# Swup Body Class plugin

Some CSS styles are very often based on the class of the page defined in the `body` element.
Swup replaces the `body` classes for each loaded page.

## Installation

This plugin can be installed with npm

```bash
npm install @swup/body-class-plugin
```

and included with import

```shell
import SwupBodyClassPlugin from '@swup/body-class-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupBodyClassPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupBodyClassPlugin()]
});
```

## Options

In some cases, the site may use the `body` class attribute for functionality such as opening of some sort of menu by adding class to the body element.
In that case, you may want to define a prefix for your page style classes such as `page-`, so only those are replaced by swup.
By default option is set to `''` and all classes of body element are replaced during the transition.

```javascript
const bodyClassPlugin = new SwupBodyClassPlugin({
  prefix: ''
});
```
