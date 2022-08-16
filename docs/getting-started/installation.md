---
layout: default
title: Installation
description: Swup can be installed in few ways
nav_order: 2
parent: Getting Started
permalink: /getting-started/installation
---

## Installation

Swup can be installed from npm...

```shell
npm install swup
```

...or include the file from the dist folder...

```html
<script src="./dist/swup.js"></script>
 
<!-- or directly from unpkg -->
<script src="https://unpkg.com/swup@latest/dist/swup.min.js"></script>  
```

## Run Swup

To run swup, create new instance of Swup class.

```javascript
import Swup from 'swup';
const swup = new Swup(); // only this line when included with script tag
```
