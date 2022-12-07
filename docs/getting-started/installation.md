---
layout: default
title: Installation
description: Swup can be installed in few ways
nav_order: 2
parent: Getting Started
permalink: /getting-started/installation
---

## Installation

If using a bundler, install swup from npm:

```shell
$ npm install swup
```

If you're not bundling your scripts, include the UMD build from the `dist` folder:

```html
<script src="./dist/index.umd.js"></script>
```

Or use the latest browser build from unpkg:

```html
<script src="https://unpkg.com/swup@3"></script>
```

## Run Swup

To run swup, create a new Swup instance.

```javascript
import Swup from 'swup';
const swup = new Swup(); // only this line when included with script tag
```
