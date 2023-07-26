"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/tsup@6.7.0_typescript@5.0.4/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_node_module = require("module");
var import_node_path = require("path");
var import_node_url = require("url");
var import_synckit = require("synckit");

// src/utils.ts
function handleClasses(classname) {
  if (!classname)
    return "";
  if (typeof classname === "string")
    return classname;
  else
    return classname.join(" ");
}
function attrsToLines(attrs, classname) {
  if (!attrs.trim())
    return [];
  const result = [];
  attrs.split(",").map((v) => v.split("-").map((v2) => parseInt(v2, 10))).forEach(([start, end]) => {
    if (start && end) {
      result.push(
        ...Array.from({ length: end - start + 1 }, (_, i) => start + i)
      );
    } else {
      result.push(start);
    }
  });
  const classes = [];
  if (!classname)
    classes.push("highlighted");
  else if (typeof classname === "string")
    classes.push(classname);
  else
    classes.push(...classname);
  result.sort((a, b) => a - b);
  return result.map((v) => ({
    line: v,
    classes
  }));
}
function mergeLineOptions(source, target) {
  target.forEach(({ line, classes = [] }) => {
    let lo = 0;
    let hi = source.length - 1;
    while (lo < hi) {
      const mid = lo + hi >> 1;
      const {
        line: _line,
        classes: _classes = []
      } = source[mid];
      if (line === _line) {
        source[mid].classes = [..._classes, ...classes];
        return;
      } else if (line < _line) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    source.splice(lo, 0, { line, classes });
  });
  return source;
}
function arrayize(value) {
  if (typeof value === "string")
    return [value];
  return value;
}

// src/index.ts
var import_meta = {};
var MarkdownItShikiExtra = (md, options) => {
  const {
    langs,
    theme = "nord",
    classname = "shiki",
    darkModeClassName = {
      dark: "shiki-dark",
      light: "shiki-light"
    },
    highlightedClassname = "highlighted",
    darkModeHighlightedClassName = {
      dark: "highlighted-dark",
      light: "highlighted-light"
    },
    diffLinesClassName = {
      minus: "diff remove",
      plus: "diff add"
    },
    darkModeDiffLinesClassName = {
      minus: {
        dark: "diff-dark remove",
        light: "diff-light remove"
      },
      plus: {
        dark: "diff-dark add",
        light: "diff-light add"
      }
    },
    highlighter
  } = options ?? {};
  let darkMode;
  let syncRun;
  if (!highlighter) {
    const themes = [];
    if (typeof theme === "string") {
      themes.push(theme);
    } else if ("dark" in theme || "light" in theme) {
      darkMode = theme;
      for (const key in theme)
        themes.push(theme[key]);
    }
    const require2 = (0, import_node_module.createRequire)(importMetaUrl);
    syncRun = (0, import_synckit.createSyncFn)(require2.resolve("./worker"));
    syncRun("getHighlighter", { langs, themes });
  }
  const highlightCode = (code, lang, options2) => {
    const { lineOptions, theme: theme2 } = options2 ?? {};
    if (highlighter)
      return highlighter.codeToHtml(code, { lang, theme: theme2, lineOptions });
    return syncRun("codeToHtml", {
      code,
      theme: theme2,
      lang,
      lineOptions
    });
  };
  md.options.highlight = (code, lang, attrs) => {
    let lineOptions = [];
    let darkLineOptions = [];
    let lightLineOptions = [];
    const highlightLinesRE = /{(.+)}/;
    if (attrs.match(highlightLinesRE)) {
      const matchedAttrs = highlightLinesRE.exec(attrs)[1];
      if (darkMode) {
        darkLineOptions = attrsToLines(matchedAttrs, darkModeHighlightedClassName == null ? void 0 : darkModeHighlightedClassName.dark);
        lightLineOptions = attrsToLines(matchedAttrs, darkModeHighlightedClassName == null ? void 0 : darkModeHighlightedClassName.light);
      } else {
        lineOptions = attrsToLines(matchedAttrs, highlightedClassname);
      }
    }
    const diffLineOptions = [];
    const darkDiffLineOptions = [];
    const lightDiffLineOptions = [];
    const minusLinesRE = /\/{2} \[\!code \-{2}\]/gm;
    const plusLinesRE = /\/{2} \[\!code \+{2}\]/gm;
    if (code.match(minusLinesRE)) {
      const codeArr = code.split("\n");
      codeArr.forEach((line, index) => {
        if (line.match(minusLinesRE)) {
          const name = diffLinesClassName.minus;
          if (darkMode) {
            const darkname = darkModeDiffLinesClassName == null ? void 0 : darkModeDiffLinesClassName.minus.dark;
            const lightname = darkModeDiffLinesClassName == null ? void 0 : darkModeDiffLinesClassName.minus.light;
            darkDiffLineOptions.push({
              line: index + 1,
              classes: arrayize(darkname)
            });
            lightDiffLineOptions.push({
              line: index + 1,
              classes: arrayize(lightname)
            });
          } else {
            diffLineOptions.push({
              line: index + 1,
              classes: arrayize(name)
            });
          }
        }
      });
      code = code.replace(minusLinesRE, "");
    }
    if (code.match(plusLinesRE)) {
      const codeArr = code.split("\n");
      codeArr.forEach((line, index) => {
        if (line.match(plusLinesRE)) {
          const name = diffLinesClassName.plus;
          if (darkMode) {
            const darkname = darkModeDiffLinesClassName == null ? void 0 : darkModeDiffLinesClassName.plus.dark;
            const lightname = darkModeDiffLinesClassName == null ? void 0 : darkModeDiffLinesClassName.plus.light;
            darkDiffLineOptions.push({
              line: index + 1,
              classes: !darkname ? arrayize(name) : arrayize(darkname)
            });
            lightDiffLineOptions.push({
              line: index + 1,
              classes: !lightname ? arrayize(name) : arrayize(lightname)
            });
          } else {
            diffLineOptions.push({
              line: index + 1,
              classes: arrayize(name)
            });
          }
        }
      });
      code = code.replace(plusLinesRE, "");
    }
    lineOptions = mergeLineOptions(lineOptions, diffLineOptions);
    darkLineOptions = mergeLineOptions(darkLineOptions, darkDiffLineOptions);
    lightLineOptions = mergeLineOptions(lightLineOptions, lightDiffLineOptions);
    if (darkMode) {
      const dark = highlightCode(code, lang, { theme: darkMode.dark, lineOptions: darkLineOptions }).replace('<pre class="shiki"', `<pre class="${handleClasses(classname)} ${handleClasses(darkModeClassName.dark)}"`);
      const light = highlightCode(code, lang, { theme: darkMode.light, lineOptions: lightLineOptions }).replace('<pre class="shiki"', `<pre class="${handleClasses(classname)} ${handleClasses(darkModeClassName.light)}"`);
      return `<pre hidden></pre><div class="shiki-container">${dark}${light}</div>`;
    } else {
      let highlighted = highlightCode(code, lang, { lineOptions });
      if (classname !== "shiki")
        highlighted = highlighted.replace('<pre class="shiki"', `<pre class="${handleClasses(classname)}"`);
      return highlighted;
    }
  };
};
var src_default = MarkdownItShikiExtra;
