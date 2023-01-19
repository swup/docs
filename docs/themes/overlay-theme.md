---
layout: default
title: Overlay Theme
description: Theme to hide pages behind overlay on the transition
parent: Themes
nav_order: 3
permalink: /themes/overlay-theme
repo_link: /overlay-theme
---

# Overlay Theme

Theme for a slide-in/slide-out animation of an overlay.

## Installation

This theme can be installed with npm

```bash
npm install @swup/overlay-theme
```

and included with import

```javascript
import SwupOverlayTheme from '@swup/overlay-theme';
```

or included from the dist folder

```html
<script src="./dist/SwupOverlayTheme.js"></script>
```

## Usage

To run this theme, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupOverlayTheme()]
});
```

## Options

### color

Changes color of the overlay element.
Defaults to `#2D2E82`.

### duration

Changes the duration of the overlay animation, in milliseconds.
Defaults to `600` (ms).

### direction

Changes the direction of the overlay animation.
Defaults to `to-right`. Available values: `to-right`, `to-left`, `to-bottom` and `to-top`.

### Default options

```javascript
new SwupOverlayTheme({
    color: '#2D2E82',
    duration: 600,
    direction: 'to-right',
});
```
