---
layout: default
title: Create a Theme 🎉
eleventyNavigation:
  key: Create a Theme 🎉
  parent: Themes
  order: 4
description: Create your own theme
permalink: /themes/create-theme/
---

# Create a Theme

Anyone can create and publish swup themes. To create a new theme, install the [swup CLI](/cli/)
and let it create one from a template. Or head over directly to the
[theme template repo](https://github.com/swup/theme-template) and follow the instructions there.

## Tips

- Check out existing themes before creating one.
- If you think your new theme should be an official swup theme and live under the `@swup/*` npm namespace, get in touch at gmarcuk@gmail.com.

## Developing themes

### Accessing swup

The swup instance is automatically assigned to the plugin instance and can be accessed as
`this.swup` in the `mount` and `unmount` methods.

### Animation selector

Swup themes automatically set the `animationSelector` option to `[class*="swup-transition-"]` to prevent bugs related to other libraries using the same classes. Use `swup-transition-*` for your theme classes.

### Preprocessors

You can use `.css`/`.styl`/`.scss` files to manage your styles.

Unlike plugins, themes need bundling to include CSS files in the bundle. For this reason, the `npm run build` command is used for building both the npm version (/lib) and the standalone version (/dist).

### Helpers

Themes have a few special helper methods:

- `applyStyles` to prepend a style tag with defined content in the head tag.
- `addClassName` to add the `swup-transition-[name]` classname to an element.
- `applyHTML` to append a `div` element with defined HTML content.

### Cleaning up

THemes need to clean up after themselves in the `umount` method: cancel any event listeners, undo
any DOM changes, etc.

### Logging

Use swup's `log` method to output any relevant information. By default this method doesn't do
anything. It will starting outputting information only if installed alongside the
[debug plugin](/plugins/debug-plugin/).
