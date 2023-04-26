---
layout: default
title: CLI
eleventyNavigation:
  key: CLI
  order: 8
description: Swup handy CLI serves to start creating plugins and themes in a matter of seconds, or validate your site setup
permalink: /cli/
has_toc: false
---

# CLI

Swup handy CLI serves to start creating plugins and themes in a matter of seconds, or validate your site setup.

## Installation

Install swup CLI globally on your machine

```shell
npm install @swup/cli -g
```

or in your project as a dev dependency if you want to use it for validating the site

```shell
npm install @swup/cli -D
```

## Usage

The best way to find out how to use swup CLI is to use it's internal help command

```shell
swup help   # prints main help
swup validate help   # prints help for validate command
```

## Creating plugins or themes

To create new plugin, run following command.

```shell
swup create --name MyName
```

Swup CLI will create _SwupMyNamePlugin_ folder, download plugin template and use defined name where it needs to.

To start creating a theme, define a type flag.

```shell
swup create --name MyName --type theme
```

Swup CLI will create _SwupMyNameTheme_ folder, download theme template and use defined name where it needs to.

## Validating site

Validate command will run a set of tests on your site, meaning it will actually open each page in a headless browser and check that each page is working correctly with swup.
This way swup doesn't need to handle invalid pages with some workaround like hard refresh after timeout, and can be safely be used on huge sites with many pages (and big probability of mistakes in pages).
The validation can also be part of your [CI/CD pipeline](/ci-cd).

Validation checks three main things that can cause troubles to swup:

- That all pages have the same number of containers.
- That all animated elements have some CSS transition duration set.
- That all animated elements have some CSS property animated when the swup transition starts (with class `is-animating`).

**These checks should prevent any situation where swup would be stuck for some reason.**

### Use validation

The easiest way to start with swup CLI validation is to just run the validation against your live site.

```shell
swup validate --baseUrl=https://swup.js.org/
```

The command will make swup CLI crawl your site, find all pages and run the tests against each page.

The command also has a bunch of options you can use, or you can use a [swup project config](/ci-cd) file for settings those as well.

```
USAGE
  $ swup validate

OPTIONS
  -a, --asynchronous                                                   Execute all tests asynchronously at once (around
                                                                       5x faster, but might cause problems)

  -b, --baseUrl=baseUrl                                                Crawl site based on defined base URL and find
                                                                       URLs to check automatically (pages that are not
                                                                       linked from other pages, like 404, won't be
                                                                       checked)

  -c, --config=config                                                  [default: swup.config.js] Defines path of swup
                                                                       config file.

  -m, --sitemap=sitemap                                                [default: public/sitemap.xml] Sitemap file
                                                                       (accepts file path or URL)

  -o, --containers=containers                                          [default: #swup] Container selectors separated by
                                                                       a comma (,)

  -s, --stylesExpectedToChange=stylesExpectedToChange                  [default: opacity,transform] Styles expected to
                                                                       change separated by a comma (,)

  -t, --runTests=all|containers|transition-duration|transition-styles  [default: all] Run only specific test.

  -u, --testUrl=testUrl                                                Run tests for single URL.
```
