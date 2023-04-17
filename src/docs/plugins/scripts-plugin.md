---
layout: default
title: Scripts Plugin
description: Plugin to re-run scripts on the page on each page transition
parent: Plugins
nav_order: 16
permalink: /plugins/scripts-plugin/
repo_link: /scripts-plugin
---

# Scripts Plugin

This plugin re-runs any scripts in head/body on swups `contentReplaced` event.
This can be helpful when the scripts included in the page are outside of the control of the developer and needs to be re-evaluated after content replace.

Plugin will ignore any script tags with attribute `data-swup-ignore-script`.
It is also necessary to add this attribute to any scripts loading and enabling swup,
to prevent creating of multiple instances of swup and prevent unnecessary swup class evaluation.

**Warning:** This plugin is only intended as last resort for projects with little control over what scripts are included.
Re-running your scripts without destroying remains of previous run can lead to memory leaks and breaking of the page.
Use at own risk.

## Installation

This plugin can be installed with npm

```bash
npm install @swup/scripts-plugin
```

and included with import

```javascript
import SwupScriptsPlugin from '@swup/scripts-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupScriptsPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupScriptsPlugin()]
});
```

## Options

### `head` and `body`

Plugin has two boolean options - `head` and `body`. Both are by default set to `true`.
Options can be used to disable re-running of scripts globally in head or body of the page.

```javascript
new SwupScriptsPlugin({
  head: true,
  body: true
});
```

### optin

In some situations, you might not have control over inserted scripts into the page (through GTM for example).
In that case, switching `optin` option to `true` will only reload the scripts explicitly marked with `data-swup-reload-script` attribute.

```javascript
new SwupScriptsPlugin({
  optin: false
});
```
