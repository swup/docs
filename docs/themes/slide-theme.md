---
layout: default
title: Slide Theme
parent: Themes
nav_order: 2
permalink: /themes/slide-theme
repo_link: /slide-theme
---

# Slide Theme
Theme for slide in/out animation. Makes content slide out (+fade) in one direction, and slide in from the other.

## Instalation

This theme can be installed with npm

```bash
npm install @swup/slide-theme
```

and included with import

```javascript
import SwupSlideTheme from '@swup/slide-theme';
```

or included from the dist folder

```html
<script src="./dist/SwupSlideTheme.js"></script>
```

## Usage

To run this theme, include an instance in the swup options.

```javascript
const swup = new Swup({
  theme: [new SwupSlideTheme()]
});
```

## Options
### mainElement 
Changes the selector of the elements to slide in/out.  
Defaults to `#swup`.

### reversed
Makes the direction reversed. 
Defaults to `false`. 
