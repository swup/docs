---
layout: default
title: Minimal Reproductions
eleventyNavigation: false
description: Please include a Minimal Reproduction
permalink: /other/minimal-reproductions/
---

# How to Create a Minimal Reproduction

The swup maintainers may ask you to create a "minimal reproduction" or "reduced test case" when
asking for help or reporting an issue. **Issues without a reproduction may be temporarily closed.** Here's why:

## Why you should create a minimal reproduction

Providing a minimal reproduction means **everyone puts in a fair amount of effort**.

By creating a minimal reproduction, you enable us to:

- Fix your bug faster
- Work on your feature request faster
- Confirm the cause of the behavior

## What is a minimal reproduction?

A minimal reproduction is a **simplified version of your code to demonstrate a problem**. It should use
the smallest amount of code and configuration needed to clearly show the problem. All features and
dependencies not related to the issue should be removed.

A minimal reproduction is the best way to help people that want to help *you*.

## How to create a minimal reproduction

1. Create a new project. See below for suggested services for hosting it.
2. Install swup and any plugins needed to demonstrate the problem.
3. Add the code needed to recreate the error you’re seeing.
4. Strip away unrelated code to focus solely on the issue.
5. Confirm that the error can be consistently reproduced with your provided code.
6. Publish the project and provide a link to it when creating an issue.

## Where to host a minimal reproduction

You can use one of the many available online IDEs to create a reproduction, e.g.
[CodeSandbox](https://codesandbox.io/p/sandbox/swup-4-minimal-reproduction-template-n6kgnp),
[Replit](https://replit.com/@swupjs/Swup-Test-Case-Template), or
[StackBlitz](https://stackblitz.com/). The important part is that it's easily accessible to
maintainers and doesn't require manual setup.

## Even better, submit a test case or a solution!

As Rich Harris [points out](https://gist.github.com/Rich-Harris/88c5fc2ac6dc941b22e7996af05d70ff#better-still-file-a-test-case-or-a-fix), maintainers appreciate it when you **contribute test cases and solutions through pull requests**. Straightforward fixes (that meet the project's code standards and pass the CI) are highly valued.

## ”But it's too much work to create a minimal reproduction“ 🥵

**It’s almost impossible to fix a bug without first being able to reliably reproduce it**. That's why we prioritize working on issues with a minimal reproduction, as they allow us to spend our time more efficiently.

## “But I already described everything in the issue” 😒

We appreciate you describing the issue in detail! However, **a minimal reproduction will make sure
that your description matches the actual behavior**, by removing everything but the necessary code.
