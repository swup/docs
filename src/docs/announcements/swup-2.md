---
layout: default
title: Announcing swup 2
eleventyNavigation: false
description: Announcing the latest release of swup
permalink: /announcements/swup-2/
---

# Announcing swup 2

It's been some time since we talked about [page transitions](https://css-tricks.com/page-transitions-for-everyone/) when [swup](https://github.com/gmrchk/swup) was first introduced to the world. If you've still missed it, you're certainly most encouraged to go ahead and find out more about swup and it's motivation, but to describe it in a few words, it's library that helps people implement smooth animated page transitions, faster load times, all together improve user experience and transform any site into a web app worth the title in 2019.

Since then we have crossed a long way together, fixed countless bugs, and introduced amazing features such as improved automatic scroll control, support for plugins, support for forms, improved API and so much more...

This wouldn't be possible without CSS-Tricks and an amazing Github community where people come together to do something for themselves, and for others, so everyone can focus less on fixing bugs and figuring out basics, and focus more on implementing beautiful designs, telling fascinating stories and just being awesome.

This story is about swup, its new features, and the motivation behind it. If you're impatient, here's is a quick overview for you.

## TL;DR

- Redesigned [plugins](/plugins) to allow anyone easily implement private plugins, or publish their own plugins for a community.
- New [Themes](/themes) feature to allow even faster to implement and much more easy to reuse page transitions. Three basic themes are "prepacked".
- Swup [CLI](/cli) to get started with developing a plugin or theme in seconds.
- New [documentation](/) that anyone is welcome to improve and extend.
- Fixed bunch of bugs.
- Improves [API](/api) for better extensibility with or without plugins.
- Moves any unnecessary functionality into plugins for better load time and development experience:
- forms → moved to [Forms Plugin](/plugins/forms-plugin)
- scroll control and everything connected to it → moved to [Scroll Plugin](/plugins/scroll-plugin)
- preload → moved to [Preload Plugin](/plugins/preload-plugin)
- replacing of class on body tag → moved to [Body Class Plugin](/plugins/body-class-plugin)
- debug mode → moved to [Debug Plugin](/plugins/debug-plugin), which also includes a bunch of new functionality to detect common mistakes when using swup
- swupjs is now a [JS Plugin](/plugins/js-plugin) and is more powerful
- improved [Head Plugin](/plugins/head-plugin)
- new frequently requested [Scripts Plugin](/plugins/scripts-plugin)
- and some more stuff to discover...

## Plugins and Themes

Let's talk about the plugins revamp. Swup already had a few plugins before, and the idea didn't change that much. The main reason behind the change is the development experience.

It used to be hard to implement a plugin, there was no option to disable plugin once enabled, passing of options into a plugin was a pain, and the availability of plugins was strictly limited to the ones that were shipped with swup.

Well, now we've gone a different way. All plugins have a unified structure, all plugins can be enabled, manipulated with, or disabled without any side effects.

...but let's get back to the development experience. In a past, I (and probably anyone who has used swup on more than one site) ended up copying a bunch of code from a previous project to re-enable JavaScript snippets/components used across projects, trigger some analytics the same way, or make swup animate in the first place. Well, we don't have to do that anymore!

Swup plugins are now meant for people, and I don't mean just developers utilizing swup plugins available by default... no! Creating and publishing plugins (or themes, while we're at it) is now as simple as copying the code into a new project, and that's for a few reasons.

First of, swup now has a plugin template --- a quick head start for a plugin, so anyone going for it can just focus on the code he/she wants to implement. Second, and probably even more exciting, is the swup CLI. SCLI is utilizing the plugin/theme templates, with the addition of pulling the repo, renaming all the variables and all that stuff that doesn't matter much with a first plugin, but gets really annoying when the number grows (trust me, I know...). Another wonderful thing is that any plugins created by SCLI are by default ready to be published into NPM with a standalone bundle included as well.

Themes, from a technical standpoint, are pretty much plugins with a different purpose. The purpose is to add any required styles, add HTML structure or modify DOM in some way to allow a quick and easy swup setup, without even having to define the animation, because someone has already done it before pretty well already. There are some additional helpers available in themes, the use off .css/.styl/.scss is also supported, but for more info head over to the [docs](/themes/create-theme).

## Spring Cleanup

As mentioned before, part of the swup plugin revamp is the fact that most of the swups additional functionality is moved into plugins. In fact, any functionality that could be extracted has been extracted into a plugin.

This has several benefits, with the first being obviously smaller size of the core library. Swup has always been small and now is even smaller with size a little under 5kb. I don't think I know any library with similar functionality that would get to this size in a standalone bundle. Plus, all the additional goodies can always be loaded with a tiny plugin.

However, the size is far from being the primary reason for this code separation. That's an inability to make any changes or extending the library.

Page transitions are quite a fun thing actually. It's a combination of very well planned series of events, a few browser hacks and usually lots of tweaking for the perfect outcome. Swup did take that into account and worked with all of it, but everything was just so much connected to each other that making any changes, or adding new functionality was a very painful process.

I'm sure I can rewrite the whole library right now, almost line by line after all the time I have spent with it, and it was still hard for me to make any modifications, not to mention an outside user that just came across swup recently. To sum it up, changes or adding of new functionality was hard and unpleasant. It's funny how a hobby project can become second work that you try to avoid at times.

That being said, any functionality that is not essential to the core idea is now in plugins, where the use of events is more or less enforced, and swup event bus serves as an interface for each and single plugin to work with swup, while not touching any other plugin in any way.

I'm one of the people that just like to experiment, and it's really frustrating when you can't because any change would be a breaking change. I'm hoping to tackle this problem this way.

Want to add some more functionality? Create a plugin in minutes. See that you're reusing some code a lot's across projects? Plugin. Want to "give something back to the community"? Plugin/theme. Hell, want to try a completely different approach and rewrite the core significantly? Let's do it! Let's a create repo under swup organization, and experiment!

This revamp also includes some changes to the API and swup methods, that makes it much easier to modify the swup to your needs, like pulling a custom structure from a server instead of a standard HTML page.

This also allows for new functionality like [Scripts plugin](/plugins/scroll-plugin) which I was always against. Now the functionality is implemented in a plugin, so swup stays untouched, but the functionality is there for anyone who needs it.

## Documentation

Not much revolutionary here to be honest. Docs of swup were growing over time, and single page layout just wasn't enough anymore. Search is definitely a helpful addition to the navigation structure as well, and anyone is encouraged to pitch in with a fix/improve the documentation, whether it's content, or the site itself.

I think that documentation of swup is one of the things that people like about it, but there is always a space for improvement. I would say with every read...

## Conclusion

To sum it up... for a user, swup can do everything it could before and some more, a little better and with an additional choice of whether you even need to load some functionality or not.

For a developer, it's not a library anymore, it's a platform. A platform that you can modify, extend, own a piece of it and help build a community for everyone.

Great ideas for generally used plugins could include things like ReCaptcha plugin, plugins for easy integration with WordPress in general, or some Vue.js integrations...? The sky is the limit here, so I will leave that for everyone's imagination.
