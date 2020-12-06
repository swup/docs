---
layout: default
title: Common Issues
description: Description of common issue or caveats people encounter
has_children: false
nav_order: 2
permalink: /other/common-issues
has_toc: false
parent: Other
---

# Common Issues

## Incorrect link attributes

Swup is by default set to do the transition for any link with `href` attribute starting with the current domain, `/` or `#`. People often use different `href` attributes like `about.html`.

```html
<!-- this is fine -->
<a href="http://example.com/about">
  <a href="http://example.com/about.html">
    <a href="/about">
      <a href="/about.html">
        <a href="#about">
          <!-- this is not fine -->
          <a href="about.html"></a></a></a></a></a
></a>
```

Default behavior can be changed with [linkSelector]({{ "/options#link-selector" | relative_url }}) option.

## Missing style for transition-\* class

Swup waits for any element with class `transition-[something]` to finish the transition. Styles with the hidden state, normal state, and the duration need to be defined for such elements, like in the example below where the element fades out/in.

```css
.transition-fade {
  transition: 0.4s;
  opacity: 1;
}
html.is-animating .transition-fade {
  opacity: 0;
}
```

In case the styles are missing and the element does not transition to any other state, swup will still wait for the element to finish the transition. However, the transition will never finish (as it never even starts) and swup gets stuck at `willReplaceContent` event of the lifecycle.

## Overusing transition-\* class

Swup waits for any element with class `transition-[something]` to finish the transition. While there is an unlimited number of elements that can have this class, only one is actually required. People tend to use a class with a format of `transition-[something]` on any element that is animating, which is not necessary and often leads to bugs. For example, misspelled class name would lead to styles not being defined for that element (see issue above).

It is recommended to use one element with class with a format `transition-[something]` to set a transition duration for swup and make any other transition happen independently.

```css
.fade {
  transition: 0.4s;
  opacity: 1;
}
html.is-animating .fade {
  opacity: 0;
}
```

The styles in the example above will still animate the element for the transition, but swup won't wait for the elements to finish the transition. If the main transition (the transition of the one element with class `transition-*`) has at least similar timing to all the others, there should be no issue with using this approach.

## Libraries using transition-\* classes

Some other libraries can use a class in a form of `transition-*` for its own functionality. A great example of such a third party code is the [Foundation framework](https://foundation.zurb.com/).

This can break swup, as swup will wait for all the elements with such class to finish transition before proceeding in the page transition lifecycle and get stuck.

In such a case, making the [animationSelector]({{ "/options#animation-selector" | relative_url }}) option more strict fixes the issue.

```javascript
var swup = new Swup({
  animationSelector: '[class*="swup-transition-"]'
});
```

```css
.swup-transition-fade {
  transition: 0.4s;
  opacity: 1;
}
html.is-animating .swup-transition-fade {
  opacity: 0;
}
```

```html
<main id="swup" class="swup-transition-fade">
  ...
</main>
```

## Escaped characters inside <noscript>

Some browsers (Safari, older versions of IE) escape characters inside of `noscript` tags when placed into the DOM with `element.innerHTML` as swup does. That is usually not an issue unless the contents of the `noscript` tags are further used in your JavaScript code. If that's the case, the characters need to be unescaped with [regex replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), a pretty creative way using `textarea` mentioned [in this thread](https://github.com/gmrchk/swup/issues/107) or in any other way.

See [this issue](https://github.com/gmrchk/swup/issues/107) for more information.

## Scroll control offset

In certain cases, there is a need to compensate for specific layout features (fixed header, etc.) by scrolling to referenced elements with some offset. swup scroll control does not have such an option, but there are other ways to solve this:

Using a separate element inside of the section as an anchor. As it's a separate element, it can be positioned relative to its parent, and so, compensate for the fixed header.

```html
<section>
  <div id="need-to-scroll-here" class="anchor"></div>
  ...
</section>
```

```css
.anchor {
  position: relative;
  top: -100px; /* your offset */
}
```

The good thing about this approach is that it will lead to the correct place even without JS and you can change the offset with a simple CSS media query.

Not so good thing is that some IE versions will ignore a link leading to that anchor if its parent has `overflow: hidden`. That can be fixed with something like:

```js
// run only for IE
document.querySelectorAll('[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    document.documentElement.scrollTop =
      Math.round(
        document.querySelector(event.target.hash).getBoundingClientRect().top
      ) + window.pageYOffset;
  });
});
```

Another option is to disable swups scroll control and use it's `scrollTo` method and swup events to scroll when you want, where you want... or rewrite the `scrollTo` method altogether to include your offset.

## Canonical link in head can cause wrong site indexing

Since search engines are improving and starting to simulate actual devices browsing the websites, canonical link tag in head (which is not replaced during transition by default) can cause site to be indexed incorrectly.

```html
<link rel="canonical" href="..." />
```

**[head-plugin]({{ "/plugins/head-plugin" | relative_url }})** could help solve that, as well as deleting the tag from head. There are also other, more reliable alternatives to make search engines index your site correctly, like sitemap.

See [this issue](https://github.com/swup/swup/issues/130) for more information.

## Improving accessibility 
Since we're dynamically re-rendering parts of the page, it's ideal to add `aria-live="polite"` attribute to the swup containers for screen readers.  
Unfortunately, this attribute [cannot be added dynamically](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) after page load to work, so it needs to be added manually.  

## Sending partial response for swup 
Swup can receive only partial response with containers, to make the payload of requests smaller. 
However, note that there can be unexpected behaviour in such situations as described [here](https://github.com/swup/swup/issues/246) for Ctrl+Shift+T (reopening recently closed tab).
This can likely be prevented by using POST requests from swup for getting this partial response (not implemented yet, as there were no requests for it - tiny modification of swup is needed), or by sending this partial response in other format like JSON, which can be handled as described [here](https://swup.js.org/api/methods#getPageData). 
