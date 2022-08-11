// Download readmes form plugin repos on GitHub

// This is NOT an automatic process: use your own judgement about which changes
// to a plugin's readme are important and need to be included in the docs.
// Consider naming (remove `Swup ` prefix from title) and keep the frontmatter.

var http = require("https");
var fs = require("fs");

var server = "https://raw.githubusercontent.com";
var org = "swup";
var dir = "docs/plugins/";

var plugins = [
  "a11y-plugin",
  "body-class-plugin",
  "custom-payload-plugin",
  "debug-plugin",
  "forms-plugin",
  "ga-plugin",
  "gia-plugin",
  "gtm-plugin",
  "head-plugin",
  "js-plugin",
  "livewire-plugin",
  "matomo-plugin",
  "preload-plugin",
  "progress-plugin",
  "scripts-plugin",
  "scroll-plugin",
];

plugins.forEach(function (plugin) {
  downloadReadme(plugin);
});

function downloadReadme(plugin) {
  var url = server + "/" + org + "/" + plugin + "/master/readme.md";
  var dest = dir + plugin + ".md";
  download(url, dest, function (message) {
    console.log(message || "Downloaded " + plugin + " readme");
  });
}

function download(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http
    .get(url, function (response) {
      response.pipe(file);
      file.on("finish", function () {
        file.close(cb);
      });
    })
    .on("error", function (err) {
      fs.unlink(dest);
      if (cb) cb(err.message);
    });
}
