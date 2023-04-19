---
layout: default
title: Debug Plugin
description: Plugin to display debug information and tips
parent: Plugins
nav_order: 5
permalink: /plugins/debug-plugin/
repo_link: /debug-plugin
---

# Debug plugin

Debug plugin adds some useful functionality to swup for development purposes.
Mainly, it outputs all the events in the console as they happen, which can be useful for debugging.

Debug Plugin rewrites swup's `log` method, so any output provided by plugins is also visible.

The plugin also tries to detect some common mistakes, and outputs suggestions in the console.

## Installation

Install the plugin from npm and import it into your bundle.

```bash
npm install @swup/debug-plugin
```

```js
import SwupDebugPlugin from '@swup/debug-plugin';
```

Or include the minified production file from a CDN:

```html
<script src="https://unpkg.com/@swup/debug-plugin@3"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupDebugPlugin()]
});
```

## Options

### globalInstance

If `true`, the plugin will store the swup instance on the global window object, making swup available at `window.swup`. Defaults to `false`.

```javascript
new SwupDebugPlugin({
  globalInstance: true
});
```
