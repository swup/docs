---
layout: default
title: Installation
description: Swup can be installed in few ways
nav_order: 2
parent: Getting Started
permalink: /getting-started/installation/
---

# Installation

There are two ways to install the package.

## 1. Bundler

If you're using a bundler in your project, install swup from npm:

```shell
npm install swup
```

In your application, import swup and create a new instance:

```js
import Swup from 'swup';

const swup = new Swup({
  /* options */
});
```

## 2. CDN

If you're not using a bundler and want to get started quickly, you can include the minified production file from a CDN:

```html
<script src="https://unpkg.com/swup@3"></script>
```

In your main script, create a new instance:

```javascript
const swup = new Swup();
```
