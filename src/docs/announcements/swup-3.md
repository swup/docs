---
layout: default
title: Announcing swup 3
eleventyNavigation: false
description: Announcing the latest release of swup
permalink: /announcements/swup-3/
---

# Announcing swup 3

It's been over three years since the last major update to the Swup was introduced with the [v2 release](/announcements/swup-2/), and that's a hell of a lot of time in the internet world. That's why I'm so excited to announce the next major release happening in the current days.

If you're not sure what Swup is until now, you're most encouraged to learn [about the motivation](https://css-tricks.com/page-transitions-for-everyone/) and [Swup](/getting-started/) itself.

First, let's give credit where it's due. This is all possible thanks to a fantastic GitHub community working on Swup, whether it's reporting bugs, introducing improvements, or simply brainstorming the next steps in the Swup roadmap.

Above all, we can thank our core maintainers [@daun](https://github.com/daun) and [@hirasso](https://github.com/hirasso) for this release, who have worked day and night and made it possible in the first place, so a big shout out to them!

The following paragraphs are about what's new to Swup, the new features and improvements, and a little about the motivation behind them.

If you're impatient and want to jump into the upgrade, here's a short [guide to review](/getting-started/upgrading-v3/). The upgrade should be straightforward in most cases, as breaking changes are minimal for the most part, and the new versions of plugins supporting v3 are already available.

Of course, everything is already reflected in the [documentation](/getting-started/) too.

## TL/DR

This time, it's mainly about cleanup. I need to be honest; there's been a lot of mess introduced by yours truly (yes, me) in the past. We needed to get rid of that before we could continue to build new features and improvements. But don't worry; there are new features and enhancements included in v3 too!

Let's have a look at those.

- New bundler called [Microbundle](https://github.com/developit/microbundle).
- First-class TypeScript support.
- Support for multiple animations on the same elements.
- Support for CSS @keyframes animations.
- The new `ignoreVisit` and `resolveUrl` options.
- Route transition class names functionality has been improved and moved to [Route Name Plugin](/plugins/route-name-plugin).
- Better and more stable access to Swup helpers for plugins.
- Plugins can now better control the page transition process.
- Improved [Head Plugin](/plugins/head-plugin), which can now wait for stylesheets to load before displaying the next page.
- A [better plugin template](https://github.com/swup/plugin) with a handy CLI.
- Better test coverage.
- Improved CI/CD, Prettier...

...and plenty more cleanup, like defining peer dependencies properly in plugins or unifying GH actions and issue templates.

It's important to mention that the cleanup didn't end with the code --- the number of existing open issues and discussions has been massively reduced and addressed, leaving us with a clean slate for future works.

It's also fair to mention that all of this has been achieved with an even smaller bundle, although it was tiny already.

## New Bundler

We switched to a new bundler called [Microbundle](https://github.com/developit/microbundle) for Swup and at least some of the official plugins. This is mainly for the excellent ergonomics it provides to the maintainers, where we can easily manage build steps in the [many repositories](https://github.com/swup) we have without the cumbersome setup we had to keep up to date all over the place.

Still, this also brings some improvements to the Swup users --- you can now consume Swup in a future-proof ESM format, apart from the ones existing in the past.

## TypeScript Support

Swup now has first-class TypeScript support. This brings better clarity to the maintainers and should prevent accidental breaking in the future.

Plugin authors can now consume Swup with typed API, leading to better predictability of what the plugin code might do or how it can use Swup API to achieve whatever it does.

For the rest of us, Swup now has a fully typed API to easily understand what options are available or how we can control Swup programmatically.

## Multiple Animations on the Same Element

Previously, if an element was running two or more animations with different timing during the transition, Swup would continue the process of page transition whenever the first animation was finished. This could be considered a bug but has been standard behavior of Swup since day one.

Swup now supports multiple animations on the same elements, meaning we're able to always wait for all running animations to finish before the page transition continues, giving users better options when it comes to timing multiple animations on the same element.

## A Couple of New Options

Swup now comes with a couple of new options that are helpful in certain situations.

The `ignoreVisit` option lets you programmatically ignore certain links and prevent Swup from handling them. This should make the `linkSelector` option much easier to define and keep up to date.

The second newly added option is called `resolveUrl`, and it lets you programmatically configure how different routes are being saved in the Swup cache, meaning you can handle different URLs and search parameters on the same page when it comes to the Swup cache, improving the ability to handle history correctly. This is handy, for example, when your page has some filtering for items, where Swup can handle the transition as usual while only keeping one latest record of the page.

## CSS @keyframes Animations

If you're a fan of CSS `@keyframes` animations, you'll be thrilled to hear Swup now supports those as a way to animate elements and waits for such animations to finish before continuing the page transition. This gives the user much more control over how the animation looks and the timing of different animation steps. After all, `@keyframes` gives you a much more advanced way of defining the animation steps overall.

## Route-Based Classnames

The functionality of the specific route transition class names (`to-homepage` and similar) has been removed from Swup. This has long been coming since it's not essential for Swup to work, and many projects don't need it at all.

But don't you worry, if you're using these classes in your projects, an improved version is now available in the [Route Name Plugin](/plugins/route-name-plugin), which also provides the `from-*` class names, missing in a previous implementation.

## Plugins Cleanup

There are a few things we've done with plugins.

First, plugins no longer rely on direct imports from subdirectories of Swup's lib folder, making the Swup API better and more stable for plugin authors. This should avoid accidental breaking of changes for plugins in the future. This has happened in the past and would likely happen again.

Plugins can better control the page transition process and defer the IN animation until certain conditions are met, which could be helpful for some plugin authors. However, what will likely be more interesting to most is that the improved [Head Plugin](/plugins/head-plugin) already uses this functionality to wait for any new stylesheets to load before displaying the next page (available with the `awaitAssets` option).

Crucially for plugin authors, the [plugin template](https://github.com/swup/plugin) has improved and has a bit more functionality. First, it comes with TypeScript types, meaning you can better see what needs to be defined on your plugin. This comes together with a bit of runtime validation too.

Second, a simple runtime check has been added to define the plugin's dependencies and their versions, where the dependency could be Swup itself or another Swup plugin.

The plugin template now comes with a handy CLI for managing the build step, dev mode, lint, and a script to validate the setup for plugin authors, meaning plugin authors don't need to go through a painful repetitive process of setting up all of that in the repository.

## Better Test Coverage

Swup has long relied on end-to-end Cypress tests to ensure the correct working and avoid breakage. These tests have been cleaned up and extended with tests related to plugins and more. Tests now also run much faster.

Unit tests were previously missing altogether. The setup for that was added, together with some test coverage too.

## CI/CD, Prettier...

Our GitHub actions now run all the required checks we've previously missed, including unit tests, e2e tests, or lint. In addition, the maintainers can now bump the package versions using the GH action. The publish GH action has also been standardized for the repositories, meaning we can work better together as a team and not rely on a single person at all.

## What Next?

With the maintainer's team fairly active in developing and using Swup in production, following releases (whether minor or major) should become more frequent. The same goes for official plugin updates or new plugins altogether.

Next up? We have yet to make any big immediate plans, but some ideas have popped up. The [fragments support](https://github.com/swup/swup/issues/488) discussion is ongoing, the [reCAPTCHA plugin](https://github.com/swup/swup/issues/489) has been in the plans for a while, and there are already [some ideas](https://github.com/swup/swup/issues?q=is%3Aopen+is%3Aissue+label%3Aswup%40v4) on what should be included in version 4.

We're also playing with the idea of revamping the documentation site to make it clearer how to use Swup to the fullest, but mainly because it should be fun, and we want to make it pretty. 🤭

Last but not least, if you're an active user of Swup and want to be able to affect its future roadmap directly, you're more than welcome to join the [maintainer's team](mailto:gmarcuk@gmail.com)!
