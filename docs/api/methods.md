---
layout: default
title: Methods
nav_order: 2
parent: API
permalink: /api/methods
---

# Methods
TODO

```javascript
// navigates to /someRoute with the animations and all... (can be used to submit forms)
swup.loadPage({
  url: '/someRoute', // route of request (defaults to current url)
  method: 'GET', // method of request (defaults to "GET")
  data: data, // data passed into XMLHttpRequest send method
  customTransition: '' // name of your transition used for adding custom class to html element and choosing custom animation in swupjs (as setting data-swup-transition attribute on link)
});

// makes request and saves page to cache
swup.preloadPage('/page-url');

// scroll page to some position (2000px from top in this example)
swup.scrollTo(document.body, 2000);
```

**Note:** `loadPage` function is used to submit forms with swup.
For more information on submitting forms with `XMLHttpRequest`, refer to [Sending forms through JavaScript](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript).

```javascript
// register event handler
swup.on('clickLink', function(event) {
  console.log(event);
});
```

```javascript
// disable swup
swup.destroy();
```

...and much more. Sky is the limit here, explore swup or create an issue for some particular example!

