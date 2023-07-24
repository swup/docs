# Swup Fade Theme
Basic theme for fade in/out animation of the main container.

## Installation

This theme can be installed with npm

```bash
npm install @swup/fade-theme
```

and included with import

```javascript
import SwupFadeTheme from '@swup/fade-theme';
```

or included from the dist folder

```html
<script src="./dist/SwupFadeTheme.js"></script>
```

## Usage

To run this theme, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupFadeTheme()]
});
```

## mainElement Option
Changes the selector of the elements to fade in/out. Defaults to `#swup`.
