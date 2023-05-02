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

Anyone can create and publish swup plugins.
To create new plugin, install [swup CLI](/cli) which can create one from a template for you.

Alternatively you can head over to [this template repo](https://github.com/swup/plugin-template) and follow the instructions there.

## Tips

- Checkout existing plugins before creating one.
- Swup instance is automatically assigned to the plugin instance and can be accessed under `this.swup` in `mount`/`unmount` methods.
- If you feel like this should be an official swup plugin (under npm `@swup` organization) and the world could use a thing like this, contact me at gmarcuk@gmail.com.
- Use swups `log` method to output any relevant information. By default the method doesn't do anything, but swup does output any calls in case [debug plugin](/plugins/debug-plugin) is used.
- All plugins should clean up any changes to swup/event listeners in `umount` method.
