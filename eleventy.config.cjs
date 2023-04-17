const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const { execSync } = require("child_process");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addFilter("prepareMenuItems", prepareMenuItems);

  // Assets will be taken care of by WebPack
  eleventyConfig.ignores.add("./src/_assets/**");

  // Add support for anchors on headlines
  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true }).use(markdownItAnchor)
  );

  // Run PageFind after every regeneration
  eleventyConfig.on("eleventy.after", () => {
    execSync(`npx pagefind --source _site`, {
      encoding: "utf-8",
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};

/**
 * Prepare menu items for usage in the njk templates
 * @param {array} pages   An array of all pages available.
 * @returns
 */
function prepareMenuItems(pages, { parentTitle = null } = {}) {
  return (
    pages
      // Respect `nav_order`
      .sort((a, b) => Math.sign(a.data.nav_order - b.data.nav_order))
      // Respect `nav_exclude`
      .filter((page) => !page.data.nav_exclude)
      // Filter for matching parentTitle if set
      .filter(
        (page) =>
          !parentTitle || parentTitle === page.data.parent
      )
  );
}