---
layout: default
title: Create a Plugin 🎉
eleventyNavigation:
  key: Create a Plugin 🎉
  parent: Plugins
  order: 100
description: Create your own plugin
permalink: /plugins/create-plugin/
---

# Create a Plugin

Anyone can create and publish swup plugins. To create a new plugin, install the [swup CLI](/cli/)
and let it create one from a template. Or head over directly to the
[plugin template repo](https://github.com/swup/plugin-template) and follow the instructions there.

## Tips

- Check out existing plugins before creating one. Maybe the desired functionality can be integrated into an existing plugin?
- If you think your new plugin should be an official swup plugin and live under the `@swup/*` npm namespace, get in touch at gmarcuk@gmail.com.

## Developing plugins

### Accessing swup

The swup instance is automatically assigned to the plugin instance and can be accessed as
`this.swup` in the `mount` and `unmount` methods.

### Cleaning up

Plugins need to clean up after themselves in the `umount` method: cancel any event listeners, undo
any DOM changes, etc.

### Logging

Use swup's `log` method to output any relevant information. By default this method doesn't do
anything. It will starting outputting information only if installed alongside the
[debug plugin](/plugins/debug-plugin/).

### Custom hooks

Create and trigger new hooks to implement additional functionality.

Create a new hook in `mount`:

```javascript
this.swup.hooks.create('submitForm');
```

Trigger the hook whenever makes sense:

```javascript
this.swup.hooks.trigger('submitForm');
```

Pass in arguments to hand them along to any registered handlers.

```javascript
this.swup.hooks.trigger('submitForm', { formData: 123 });
```

### Replaceable hooks

Passing in a default handler when triggering a hook will allow users of your plugin
to replace this default handler with a custom implementation. This is an advanced pattern to avoid
monkeypatching instance methods.

In the example below, the default form handler uses `fetch` to submit the form.

```javascript
swup.hooks.trigger(
  'submitForm',
  // arguments passed into the hook
  { action: url, data: new FormData() },
  // default hook handler
  (context, { action, data }) => {
    fetch(action, { body: data }).then(/* */);
  }
);
```

Consumers can now replace the default handler with a custom handler. In this example, they are
using axios to submit the form instead.

```javascript
swup.hooks.replace(
  'submitForm',
  (context, { action, data }) => {
    axios.get(action, { params: data }).then(/* */);
  }
);
```
