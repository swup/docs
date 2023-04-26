---
layout: default
title: CI/CD
eleventyNavigation:
  key: CI/CD
  order: 8
description: You can test your site after each deployment, or as a part of the deploy process
permalink: /ci-cd/
has_toc: false
---

# CI/CD

You can test your site after each deployment, or as a part of the deploy process.
For this you can use [swup cli](/cli), which now has a `validate` command with a bunch of options.

Note that `validate` command runs test against a live site, while checking the pages in a headless browser.
This means the site needs to be running on some domain, or can be temporarily started just for checks.
You can use this docs site as an example, which is using a [CircleCI pipeline](https://github.com/swup/docs/blob/master/.circleci/config.yml) with [http-server package](https://github.com/swup/docs/blob/master/package.json#L20) to start a server and validate site on each PR.

Instead of using the [command line options](/cli), you can also define the options in a `swup.config.js` file in the root of your project.
This file needs to default export an object, similar to the one below.
This example also shows defaults which will be used if not defined in this file or through CLI option.

```javascript
export default {
  // just some info about your swup setup so pages can be properly validated
  swup: {
    animationSelector: '[class*="swup-transition-"]', // animationSelector options of swup used in your project
    containers: ['#swup'] // containers options of swup used in your project
  },
  //  setup of your validation
  validate: {
    stylesExpectedToChange: ['opacity', 'transform'], // styles which are animated on your animated elements (checks that at least one is changed during transition)
    sitemap: 'public/sitemap.xml', // path or link to your sitemap
    urls: [], // set of URL - if set, swup CLI will check these URLs only (alternative to sitemap)
    baseUrl: '', // baseUrl of your site - if set, swup CLI will crawl the site for you, so you don't need to define URL manually (not referenced pages like 404 won't be checked)
    asynchronous: false, // can run all tests at once asynchronously (way faster, but might cause problems)
    runTests: 'all' // can run only one check instead of all (containers, transition-duration, transition-styles)
  }
};
```
