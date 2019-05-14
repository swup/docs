---
layout: default
title: Overlay Theme
parent: Themes
nav_order: 3
permalink: /themes/overlay-theme
---

# Swup Overlay Theme
Theme for slide in/out animation of overlay. 

## Instalation

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
  theme: [new SwupOverlayTheme()]
});
```

## Options
### color 
Changes color of the overlay element.   
Defaults to `#2D2E82`.

