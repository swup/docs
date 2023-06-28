---
layout: default
title: Installation
eleventyNavigation:
  key: Installation
  parent: Getting Started
  order: 2
description: Swup can be installed in few ways
permalink: /getting-started/installation/
---

# Installation

## Bundler

If you're using a bundler in your project, install swup from npm:

```shell
npm install swup
```

In your application, import swup and create a new instance:

```javascript
import Swup from 'swup';

const swup = new Swup({
  /* options */
});
```

## CDN

If you're not using a bundler and want to get started quickly, you can include
the minified production file from a CDN:

```html
<script src="https://unpkg.com/swup@4"></script>
```

In your main script, create a new instance:

```javascript
const swup = new Swup();
```

## ESM

Swup and its plugins can be imported as ES modules for browsers that support it.
The specifics differ depending on the CDN, but here's a
[pattern](https://web.dev/serve-modern-code-to-modern-browsers/) for including
the ES module where supported, and falling back to a UMD version for older
browsers. Note the `?module` query string in the first import URL.

```html
<!-- Import Swup as ESM -->

<script type="module">
  import Swup from 'https://unpkg.com/swup@4?module';
  const swup = new Swup();
</script>

<!-- Import Swup as UMD for older browsers -->

<script nomodule src="https://unpkg.com/swup@4"></script>
<script nomodule>
  const swup = new Swup();
</script>
```
