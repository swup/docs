# Swup Scripts Plugin

This plugin re-evaluates any `<script>` tags inside the `<head>` and/or `<body>` of your website on swup's `contentReplaced` event. This can be helpful if you don't have full control over the scripts included on your website and need to re-run certain scripts on every page view.

The plugin will ignore any script tags with the attribute `[data-swup-ignore-script]`. It is also necessary to add this attribute to the script from where you are initializing swup itself, to prevent the creation of multiple swup instances.

**🚨Warning:** This plugin is only intended as a last resort for projects with little control over what scripts are included.
Re-running your scripts without first destroying any previous scripts can lead to memory leaks and in the worst case break your page.
Use this at your own risk.

## Installation

Install the plugin from npm and import it into your bundle.

```bash
npm install @swup/scripts-plugin
```

```javascript
import SwupScriptsPlugin from '@swup/scripts-plugin';
```

Or include the minified production file from a CDN:

```html
<script src="https://unpkg.com/@swup/scripts-plugin@1"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupScriptsPlugin()]
});
```

## Options

### `head` and `body`
The plugin provides two boolean options - `head` and `body`. Both are set to `true` by default.
Set these to `false` to disable re-evaluating scripts globally in the head or body of your website.

```javascript
new SwupScriptsPlugin({
  head: true,
  body: true
});
```

### optin
In some situations, you might not have control over inserted scripts into the page (through Google Tag Manager, for example).
In that case, setting the `optin` option to `true` will only reload the scripts explicitly marked with the `[data-swup-reload-script]` attribute. 

```javascript
new SwupScriptsPlugin({
  optin: false
});
```
