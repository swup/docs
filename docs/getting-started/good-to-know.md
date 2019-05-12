---
layout: default
title: Good to Know
nav_order: 5
parent: Getting Started
permalink: /getting-started/good-to-know
---

# Good to know
Helpful, but not necessary info on swup...

## Request Header
Swup sets `X-Requested-With` request header to value `swup`.
This can be used to control what the server sends back for swup, like swup content blocks without layout.
Keep in mind that order of blocks in such layout-less response must be the same as it is in the normal rendered page.
The response can take other forms, like JSON.
In that case, swups [getPageData]({{ "/api/methods/#getpagedata" | relative_url }}) method must be modified to fit your needs and return the same information for swup to save in cache.
