"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/worker.ts
var worker_exports = {};
module.exports = __toCommonJS(worker_exports);
var import_shiki = require("shiki");
var import_synckit = require("synckit");
var highlighter;
async function handler(command, options) {
  if (command === "getHighlighter") {
    highlighter = await (0, import_shiki.getHighlighter)(options);
  } else {
    let { code, lang, lineOptions, theme } = options;
    const loadedLangs = highlighter.getLoadedLanguages();
    // if (!loadedLangs.includes(lang))
    //   await highlighter.loadLanguage(lang);
    // const loadedThemes = highlighter.getLoadedThemes();
    // if (!loadedThemes.includes(theme))
    //   await highlighter.loadTheme(theme);
    if (!loadedLangs.includes(lang))
      lang = "text";
    return highlighter.codeToHtml(code, {
      lang,
      lineOptions: lineOptions ?? [],
      theme
    });
  }
}
(0, import_synckit.runAsWorker)(handler);
