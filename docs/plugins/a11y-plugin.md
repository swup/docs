---
layout: default
title: Accessibility Plugin
description: Plugin to enhanced accessibility 
parent: Plugins
nav_order: 4
permalink: /plugins/accessibility-plugin
repo_link: /a11y-plugin
---

# Accessibility Plugin

**by [daun](https://github.com/daun)**

Enhance the accessibility of your [swup](https://github.com/swup/swup)-powered
sites.

Loading new content via AJAX is great UX for most users, but comes with serious
shortcomings for screen reader users. We can improve the experience for
everybody if we:

- **Announce page visits** to screenreaders by reading the new page title
- **Focus the main content area** after swapping out the content

That's exactly what this plugin does.

## Installation

This plugin can be installed with npm

```bash
npm install @swup/a11y-plugin
```

and included with import

```shell
import SwupA11yPlugin from '@swup/a11y-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupA11yPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupA11yPlugin()]
});
```

## Markup

The plugin should work out of the box if you use proper semantic markup for your
content, i.e. `main` for your content area and `h1` or `h2` for your headings.

```html
<header>
  Logo
</header>
<main> <!-- will be focussed -->
  <h1>Page Title</h1> <!-- will be announced -->
  <p>Lorem ipsum dolor sit amet</p>
</main>
```

## Options

All options with their default values:

```javascript
{
  contentSelector: 'main',
  headingSelector: 'h1, h2, [role=heading]',
  announcementTemplate: 'Navigated to: {title}',
  urlTemplate: 'New page at {url}'
}
```

### contentSelector

The selector for matching the main content area of the page.

This area will receive focus after a new page was loaded.

### headingSelector

The selector for finding headings **inside the main content area**.

The first heading's content will be read to screen readers after a new page was
loaded.

### announcementTemplate

How to announce the new page title.

### urlTemplate

How to announce the new page url. Only used as fallback if neither a title tag
nor a heading were found.
