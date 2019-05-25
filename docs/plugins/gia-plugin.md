---
layout: default
title: Gia Plugin
parent: Plugins
nav_order: 5
permalink: /plugins/gia-plugin
repo_link: /gia-plugin
---

# Gia Plugin
Swup plugin for simple implementation with [Gia framework](https://github.com/giantcz/gia). 
Plugin automatically reloads components when it's needed only for the replaced containers. 

## Instalation

This plugin can be installed with npm

```bash
npm install @swup/gia-plugin
```

and included with import

```javascript
import SwupGiaPlugin from '@swup/gia-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupGiaPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupGiaPlugin()]
});
```


## Options

### components
Defines components object to be used for mount/unmount. Defaults to empty object.

```javascript
import Component from 'gia/Component'

class SampleComponent extends Component {
    // ...
}

const components = {
    SampleComponent: SampleComponent
}
new SwupGiaPlugin({components: components});
```

### firstLoad
Defines whether plugin should load the component on start. Defaults to `true`.

```javascript
new SwupGiaPlugin({firstLoad: true});
```

### log
Defines whether plugin should let Gia report info on mounting/unmounting of components (like setting `log` variable with [Gia config](https://github.com/giantcz/gia#config)).
Defaults to `false`.

```javascript
new SwupGiaPlugin({log: false});
```
