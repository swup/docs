---
layout: default
title: How it works
description: A simple explanation of how swup gets things done
parent: Getting Started
nav_order: 1
permalink: /getting-started/how-it-works
---
# How it works

Think of swup as being pjax on steroids. The concepts are similar to those used in barba.js or other transition libraries, but swup pays more attention to ease of use and flexibility.    

Apart from loading the contents of the new page and replacing the required parts in the DOM, swup is built around CSS transitions.
The main thing that needs to be done is defining a hidden state in CSS.

When a user navigates your website, Swup waits for all elements on the current page that contain the class `transition-[something]` to finish their animation, before switching the container contents and animating your page back in. We recommend that you set the `transition-[something]` class on **only one element** for each page. All other elements you want to animate during page transitions should be animated independently (without using a separate `transition-[something]` class for each of them).

For the animations based on CSS to be possible, swup uses several classes that are assigned to the `html` tag through the process of a page transition. 

- `is-animating` - This class is assigned to the html tag once link is clicked and is removed shortly after the content of the page is replaced. Used for defining styles for an unloaded page. 
- `is-changing` - Assigned once a link is clicked and removed when the whole process of transition of pages is done. Used for showing some loading.
- `is-leaving` - Assigned once a link is clicked and removed right before the content is replaced. Can be used together with `is-animating` to create different animation for _IN_ and _OUT_.
- `is-rendering` - Assigned right before the content is replaced and removed when the whole process of transition of pages is done. Same use case as above.
- `to-[route of next page in URL friendly form]` - Assigned once a link is clicked and removed when the whole process of transition of pages is done.
  Custom class can be also added by adding `data-swup-transition` to the link, where `to-[content of data-swup-transition attribute]` is added to html. 
  Class can be used to change animation for different URLs.
