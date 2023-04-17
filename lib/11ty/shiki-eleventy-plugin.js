const shiki = require('shiki');

/**
 * A plugin to use the shiki code highlighter with Eleventy
 * @see https://www.hoeser.dev/blog/2023-02-07-eleventy-shiki-simple/
 */
module.exports = (eleventyConfig, options) => {
  // empty call to notify 11ty that we use this feature
  // eslint-disable-next-line no-empty-function
  eleventyConfig.amendLibrary('md', () => {});

  eleventyConfig.on('eleventy.before', async () => {
    const highlighter = await shiki.getHighlighter(options);
    eleventyConfig.amendLibrary('md', (mdLib) =>
      mdLib.set({
        highlight: (code, lang) => highlighter.codeToHtml(code, { lang }),
      })
    );
  });
};
