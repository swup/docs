---
layout: default
title: How it works
parent: Getting Started
nav_order: 1
permalink: /getting-started/how-it-works
---
# How it works

Apart from loading the contents of the new page and replacing required parts in DOM, swup is built around CSS transition.
The main thing that needs to be done is defining hidden state in CSS.
Swup detects the end of transition of animated elements and proceeds to replacing the content and animating your page back.
For the animations based on CSS to be possible, swup uses several classes that are assigned to the `html` tag through the process of page transition.

- `is-animating` - This class is assigned to the html tag once link is clicked and is removed shortly after the content of the page is replaced. Used for defining styles for an unloaded page. 
- `is-changing` - Assigned once a link is clicked and removed when the whole process of transition of pages is done. Used for showing some loading.
- `is-leaving` - Assigned once a link is clicked and removed right before the content is replaced. Can be used together with `is-animating` to create different animation for _IN_ and _OUT_.
- `is-rendering` - Assigned right before the content is replaced and removed when the whole process of transition of pages is done. Same use case as above.
- `to-[route of next page in URL friendly form]` - Assigned once a link is clicked and removed when the whole process of transition of pages is done.
  Custom class can be also added by adding `data-swup-transition` to the link, where `to-[content of data-swup-transition attribute]` is added to html. 
  Class can be used to change animation for different URLs.
