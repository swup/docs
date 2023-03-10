---
layout: default
title: Custom Payload Plugin
description: Plugin to allow receiving of custom payload formats from the server
parent: Plugins
nav_order: 4
permalink: /plugins/custom-payload-plugin
repo_link: /custom-payload-plugin
---



# Custom Payload Plugin

Adds support for sending a custom payload format from server, to reduce the size of payload data.

An example of such payload can be a JSON with page title and swup containers only.
This custom payload can be sent from server based on the `X-Requested-With` header which swup sets to value `swup`.

## Installation

This plugin can be installed with npm

```bash
npm install @swup/custom-payload-plugin
```

and included with import

```javascript
import SwupCustomPayloadPlugin from '@swup/custom-payload-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupCustomPayloadPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const customPayloadOption = {
    generatePageObject: (request) => {  // receives request object created by swup which contains server response
        // parse data from request here and prepare it for return

        return {
            title,  // required - title of page
            blocks, // required - containers on page in correct order (as marked by [data-swup] attributes in DOM)
            pageClass, // not requered - class of body element (but might be required by some plugin like Body Class plugin)
            originalContent,    // not required - whole page html content (but might be required by some plugin)
        };
    }
}

const swup = new Swup({
  plugins: [new SwupCustomPayloadPlugin(customPayloadOption)]
});
```
