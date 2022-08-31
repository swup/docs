---
layout: default
title: Forms Plugin
description: Plugin to submit forms with transitions
parent: Plugins
nav_order: 6
permalink: /plugins/forms-plugin
repo_link: /forms-plugin
---

# Forms plugin

Add support for sending forms via swup.

Forms matching the customizable [selector](#formselector) `form[data-swup-form]`
will be serialized and submitted by swup. The appropriate `method` and `action`
are derived from the form's attributes. If not specified otherwise, forms are
submitted as `GET` requests to the current url.

The server response must be a valid page with all containers to be replaced by
swup.

If a `data-swup-transition` attribute is found on the form element, it is used
to select the swup animation.

**Note:** This plugin is appropriate for simple use cases like search inputs or
contact forms. For more complex requirements involving file uploads or custom
serialization, it is recommended to use the swup API directly.

## Installation

This plugin can be installed with npm

```bash
npm install @swup/forms-plugin
```

and included with import

```shell
import SwupFormsPlugin from '@swup/forms-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupFormsPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupFormsPlugin()]
});
```

## Options

### formSelector

The `formSelector` option defines a selector for forms which should be sent via
swup (with transition as any other request). By default, any form with a
`data-swup-form` attribute is selected.

```javascript
new SwupFormsPlugin({
  formSelector: 'form[data-swup-form]'
});
```

## Changes of the swup instance

The plugin adds two events to swup:

### `submitForm` 

Triggered every time a form is being submitted:

```js
swup.on('submitForm', e => console.log(e));
```

### `openFormSubmitInNewTab`

Triggered each time a form is being submitted to a new tab or window. This will happen if the user has pressed either the `Command` (Mac), `Control` (Windows) or `Shift` key while submitting the form. The plugin normalizes that behavior across browsers.

## Browser support

Form submissions are serialized using the
[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
browser API. If you need to support older browsers such as IE 11, you should add
a [polyfill](https://github.com/ungap/url-search-params).
