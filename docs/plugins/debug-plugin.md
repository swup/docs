---
layout: default
title: Debug Plugin
parent: Plugins
nav_order: 1
permalink: /plugins/debug-plugin
repo_link: /debug-plugin
---

# Debug plugin
Debug plugin adds some useful functionality to the swup for development purposes. 
Mainly, it outputs all the events in a console as they happen, which can be useful for debugging. 

Plugin rewrites swups `log` method, so any output provided by plugins is visible. 

Plugin also tries to detect some common mistakes, and outputs a suggestions into a console.   
The list of mistakes the plugin detects is expected to grow over time. 

## Instalation
This plugin can be installed with npm

```bash
npm install @swup/debug-plugin
```

and included with import

```shell
import SwupDebugPlugin from '@swup/debug-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupDebugPlugin.js"></script>
```

## Usage
To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupDebugPlugin()]
});
```
