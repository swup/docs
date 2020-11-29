---
layout: default
title: Head Plugin
description: Plugin to replace tags in the head tag
parent: Plugins
nav_order: 10
permalink: /plugins/head-plugin
repo_link: /head-plugin
---

# Head Plugin

Plugin serves to replace the contents of head tag when the content of the page is replaced.
Primary reason for this can be usage of different style files included with a `link` for different pages.

**Note:** This plugin is rather experimental and any improvements or comments are more than welcome.

## Installation

This plugin can be installed with npm

```bash
npm install @swup/head-plugin
```

and included with import

```javascript
import SwupHeadPlugin from '@swup/head-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupHeadPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupHeadPlugin()]
});
```
