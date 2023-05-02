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

Anyone can create and publish swup themes.
To create a new theme, install the [swup CLI](/cli/) which can create them from a template.

Alternatively, head over to [the template repo](https://github.com/swup/theme-template) and follow the instructions there.

## Tips

- Check out existing themes before creating one.
- The swup instance is automatically assigned to the theme instance and can be accessed as `this.swup` in the `mount`/`unmount` methods.
- Swup themes automatically set the `animationSelector` option to `[class*="swup-transition-"]` to prevent bugs related to other libraries using the same classes. Use `swup-transition-*` for your theme classes.
- You can use `.css`/`.styl`/`.scss` files to manage your styles.
- Unlike plugins, themes need bundling to include CSS files in the bundle. For this reason, the `npm run build` command is used for building both the npm version (/lib) and the standalone version (/dist).
- Themes have a few special helper methods:
  - `applyStyles` to prepend a style tag with defined content in the head tag.
  - `addClassName` to add the `swup-transition-[name]` classname to an element.
  - `applyHTML` to append a `div` element with defined HTML content.
- If you feel like this should be an official theme under the `@swup` organization and the world could use a thing like this, contact me at gmarcuk@gmail.com.
- Use swup's `log` method to output any relevant information when the [debug plugin](/plugins/debug-plugin/) is used.
- Themes should clean up after themselves in the `unmount` method, especially any changes to swup or any event listeners added.
