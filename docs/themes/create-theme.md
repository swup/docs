---
layout: default
title: Create Theme 🎉
parent: Themes
nav_order: 10
permalink: /themes/create-theme
---

# Create Plugin
Anyone can create and publish swup themes. 

Start with heading to [this repo](https://github.com/swup/theme-template) and follow the instructions there. 

## Tips
- Checkout existing themes before creating one.
- Swup instance is automatically assigned to the theme instance and can be accessed under `this.swup` in `mount`/`unmount` methods.
* Swup theme automatically sets swup animationSelector option to `[class*="swup-transition-"]` to prevent bugs related to other libraries using the same classes. Use `swup-transition-*` for your theme classes. 
- Themes get a few special helper methods below. These are primarily there because swup theme will automatically cleanup the use of these methods in case the theme is disabled. 
    * `applyStyles` to prepend style tag with defined content in the head tag.
    * `addClassName` to add `swup-transition-[name]` classname to an element.
    * `applyHTML` to append a *DIV* element with defined HTML content.  
- If you feel like this should be an official swup theme (under npm `@swup` organization) and the world could use a thing like this, contact me at gmarcuk@gmail.com.
- Use swups `log` method to output any relevant information. By default the method doesn't do anything, but swup does output any calls in case [debug plugin](/plugins/debug-plugin) is used.
- All themes should clean up any changes to swup/event listeners in `umount` method.