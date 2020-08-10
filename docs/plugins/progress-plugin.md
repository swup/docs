---
layout: default
title: Progress Bar Plugin
description: Plugin for displaying a loading indicator 
parent: Plugins
nav_order: 11
permalink: /plugins/progress-plugin
repo_link: /progress-plugin
---

# Progress Bar Plugin

**by [daun](https://github.com/daun)**

This [swup](https://github.com/swup/swup) plugin will display a progress bar for
all requests taking longer than ~300ms.

More or less a port of Turbolink's implementation.

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

The progressbar has a class name of `swup-progress-bar` you can use for styling.

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
  delay: 300
}
```

### className

Class name to use for the container div.

### transition

Length of CSS transition between loading states, in milliseconds.

### delay

How long to wait before showing the progress bar, in milliseconds.

Set to `0` to always display the progress bar, even on fast requests.
