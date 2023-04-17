# Swup Docs

:blue_book: Documentation Website for [swup](https://swup.js.org/)

## Contributing

Something to add? Found a typo? Help your future self and others by updating the docs. Simply edit the appropriate markdown files, the docs will be re-generated automatically ✨

## Install locally:

```sh
git clone git@github.com:swup/docs.git
cd ./docs
npm install
```

## Develop & Preview:
This site makes use of [Eleventy](https://github.com/11ty/eleventy) for compiling the markdown files to HTML. [WebPack](https://github.com/webpack/webpack) takes care of bundling and transpiling the assets (SCSS, JavaScript).
```sh
npm run watch
```
This will start watch modes for both Eleventy and WebPack.
Your terminal will print the exact `localhost` URL where you can preview your work.

## Build:
```sh
npm run build
```