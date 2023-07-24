# Swup Progress Bar Plugin

This [swup](https://github.com/swup/swup) plugin will display a progress bar for
all requests taking longer than ~300ms.

## Installation

This plugin can be installed with npm

```bash
npm install @swup/progress-plugin
```

and included with import

```shell
import SwupProgressPlugin from '@swup/progress-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupProgressPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupProgressPlugin()]
});
```

## Styling

The progress bar has a class name of `swup-progress-bar` you can use for styling.

```css
.swup-progress-bar {
  height: 4px;
  background-color: blue;
}
```

## Options

```javascript
{
  className: 'swup-progress-bar',
  transition: 300,
  delay: 300,
  initialValue: 0.25,
  hideImmediately: true
}
```

### className

Class name to use for the container div.

### transition

Length of CSS transition between loading states, in milliseconds.

### delay

How long to wait before showing the progress bar, in milliseconds.

Set to `0` to always display the progress bar, even on fast requests.

### initialValue

To create a slightly more "realistic" appearance, the progress bar will start
out at a random position beteen 0 and the value of this option. Set to `0` to
always start from the left.

### hideImmediately

Whether the progress bar is hidden instantly after a page visit.

Set to `false` to always complete the transition to `width: 100%` before hiding it.
