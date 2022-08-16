---
layout: default
title: Create Theme 🎉
description: Create your own theme
parent: Themes
nav_order: 4
permalink: /themes/create-theme
---

# Create Theme

Anyone can create and publish swup themes.
To create new theme, install [swup CLI]({{ "/cli" | relative_url }}) which can create one from a template for you.

Alternatively you can head over to [this template repo](https://github.com/swup/theme-template) and follow the instructions there.

## Tips

- Checkout existing themes before creating one.
- Swup instance is automatically assigned to the theme instance and can be accessed under `this.swup` in `mount`/`unmount` methods.
- Swup theme automatically sets swup animationSelector option to `[class*="swup-transition-"]` to prevent bugs related to other libraries using the same classes. Use `swup-transition-*` for your theme classes.
- You can use `.css`/`.styl`/`.scss` to manage your styles.
- Unlike plugins, themes need a bundling to include CSS files in the bundle. For this reason, `npm run build` command is used for building both, npm version (/lib) and standalone version (/dist).
- Themes get a few special helper methods below. These are primarily there because swup theme will automatically cleanup the use of these methods in case the theme is disabled.
  - `applyStyles` to prepend style tag with defined content in the head tag.
  - `addClassName` to add `swup-transition-[name]` classname to an element.
  - `applyHTML` to append a *DIV* element with defined HTML content.  
- If you feel like this should be an official swup theme (under npm `@swup` organization) and the world could use a thing like this, contact me at gmarcuk@gmail.com.
- Use swups `log` method to output any relevant information. By default the method doesn't do anything, but swup does output any calls in case [debug plugin]({{ "/plugins/debug-plugin" | relative_url }}) is used.
- All themes should clean up any changes to swup/event listeners in `umount` method.
