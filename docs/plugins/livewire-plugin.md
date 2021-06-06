---
layout: default
title: Laravel Livewire Plugin
description: Plguin to refresh Livewire components after swup page transition
parent: Plugins
nav_order: 12
permalink: /plugins/livewire-plugin
repo_link: /livewire-plugin
---

# Livewire Plugin

[Laravel Livewire](https://laravel-livewire.com/) doesn't work by default with Swup.
The Livewire components work on initial page load but stop working on subsequent pages rendered by Swup.
This plugin fixes this issue and brings support for Laravel Livewire to Swup.

## Installation

This plugin can be installed with npm

```bash
npm install @swup/livewire-plugin
```

and included with import

```javascript
import SwupLivewirePlugin from '@swup/livewire-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupLivewirePlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
    plugins: [new SwupLivewirePlugin()]
});
```
