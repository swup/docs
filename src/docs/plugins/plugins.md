---
layout: default
title: Plugins
eleventyNavigation:
  key: Plugins
  order: 4
description: List of available official plugins
permalink: /plugins/
---

# Plugins

Swup is small by design. Extended features can be added via plugins.

See below for details on [installing and enabling plugins](#installing-plugins).

## Official plugins

These are plugins developed and maintained by the swup core team.

|                        Plugin                         |                    Features                    |
| ----------------------------------------------------- | ---------------------------------------------- |
| [Accessibility Plugin](/plugins/accessibility-plugin) | Enhance accessibility                          |
| [Body Class Plugin](/plugins/body-class-plugin)       | Update the body classname                      |
| [Debug Plugin](/plugins/debug-plugin)                 | Debug and get help in development              |
| [Forms Plugin](/plugins/forms-plugin)                 | Submit forms with animations                   |
| [Fragment Plugin](/plugins/fragment-plugin)           | Dynamically replace containers based on rules  |
| [Head Plugin](/plugins/head-plugin)                   | Update the contents of the head tag            |
| [JS Plugin](/plugins/js-plugin)                       | Manage animations in JS                        |
| [Parallel Plugin](/plugins/parallel-plugin)           | Animate the previous and next page in parallel |
| [Preload Plugin](/plugins/preload-plugin)             | Preload pages to speed up navigation           |
| [Progress Bar Plugin](/plugins/progress-bar-plugin)   | Display a progress bar                         |
| [Route Name Plugin](/plugins/route-name-plugin)       | Named routes and route-based animations        |
| [Scripts Plugin](/plugins/scripts-plugin)             | Re-evaluate scripts                            |
| [Scroll Plugin](/plugins/scroll-plugin)               | Smooth scrolling                               |

## Official integrations

These are plugins connecting swup with other frameworks or services.

|                   Plugin                    |     Integrates with     |
| ------------------------------------------- | ----------------------- |
| [GA Plugin](/plugins/ga-plugin)             | Google Analytics        |
| [Gia Plugin](/plugins/gia-plugin)           | Gia frontend components |
| [GTM Plugin](/plugins/gtm-plugin)           | Google Tag Manager      |
| [Livewire Plugin](/plugins/livewire-plugin) | Laravel Livewire        |
| [Matomo Plugin](/plugins/matomo-plugin)     | Matomo analytics        |

## Installing plugins

Install and import the plugin via npm and your bundler:

```shell
npm install @swup/scroll-plugin
```

```javascript
import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';
```

Enable the plugin at initialisation of swup by including it in the options:

```javascript
const swup = new Swup({
  plugins: [new SwupScrollPlugin()]
});
```

Alternatively, you can use swup's `use` & `unuse` methods to add or remove plugins after intialization.

```javascript
const swup = new Swup();
swup.use(new SwupScrollPlugin());
```

## Accessing plugin instances

Use swup's `findPlugin` method to find and manipulate plugin instances directly.

```javascript
const pluginInstance = swup.findPlugin('SwupScrollPlugin');
```
