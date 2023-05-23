---
layout: default
title: Integrations
eleventyNavigation:
  key: Integrations
  parent: Other
  order: 1
description: Integrating swup with other tools
permalink: /other/integrations/
---

# Integrations

This is a collection of snippets for integrating swup with other popular tools.

## Alpine.js

Swup works well with [Alpine.js](https://alpinejs.dev/) for managing component
state and automating page lifecycles. Just initialize both libraries and enjoy
automatic initialization of your components:

```js
import Swup from 'swup';
import Alpine from 'alpinejs';

const swup = new Swup();
Alpine.start();
```

```html
<div id="swup">
  <div
    x-data="{ name : 'My Component' }"
    x-init="console.log(name + ' initialized!')"
  >
    My Component
  </div>
</div>
```

### Listening to swup events

If you want to listen to swup events inside your Alpine components, you need to
make use of the [`.camel` modifier](https://alpinejs.dev/directives/on#camel)
since camelCase is not supported in HTML attribute names. For example, listening
for the `contentReplaced` event would look like this:

```html
<div
  x-data
  x-on:swup:content-replaced.camel.document="console.log('content replaced!')"
>
  My Alpine Component
</div>
```
