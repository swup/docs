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
Plugin adds support for forms. Any form that matches the [formSelector](#formSelector) is sent via swup (with transition).

Swup will take the form data and submit it with appropriate `method` and `action` based on form attributes, where method defaults to `GET` and action defaults to current url.
In case of `GET` method, swup serializes the data into url. 
For `POST` requests, swup wraps the data and sends it via POST request. 

**Note:** This feature is rather experimental and serves to enable submission of simple forms such as "search on website" form. 
The response from the server must be a valid page with all containers that need to be replaced by swup.
This method does not support submission of files, or other advanced features. 
If you're looking for such features, please, use swup [API]({{ "/api" | relative_url }}) to send requests. 

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
`formSelector` option defines a selector for forms which should be sent via swup (with transition as any other request). 
By default, any form with `data-swup-form` attribute is selected.

```javascript
new SwupFormsPlugin({formSelector: 'form[data-swup-form]'});
```

## Changes of swup instance
Plugin adds `submitForm` and `openFormSubmitInNewTab` events to swup, that can be listened to with `on` method.  
