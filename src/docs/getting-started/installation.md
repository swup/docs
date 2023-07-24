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

If you use a bundler in your project, install swup from npm:

```shell
npm install swup
```

In your application, import swup and create a new instance:

```javascript
import Swup from 'swup';
const swup = new Swup();
```

## CDN

If you're not using a bundler and want to get started quickly, you can include the minified
production file from a CDN and create a new instance in your main script:

```html
<script src="https://unpkg.com/swup@4"></script>
<script>
  const swup = new Swup();
</script>
```

## ESM

Swup and its plugins can be imported as native ES modules for modern browsers. The specifics differ
depending on the CDN, but here is a [pattern](https://web.dev/serve-modern-code-to-modern-browsers/)
for including the ES module where supported, and falling back to a UMD version for older browsers.
Note the `?module` query string in the first import URL.

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

## Next steps

You're now ready to start building with swup by exploring these topics:

- Create a first [example site](/getting-started/example/) to get to know swup
- Look at [interactive demos](/getting-started/demos/) to see swup in action
- Learn about [options](/options/) and [hooks](/hooks/) to customize how swup works
- Install [plugins](/plugins/) and [themes](/themes/) for extended functionality
