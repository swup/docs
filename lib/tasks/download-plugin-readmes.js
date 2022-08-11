// Download readmes from plugin repos on GitHub

console.log('Downloading readmes from plugin repositories...', '\n');
console.warn('This is NOT an automatic process!', '\n');
console.warn('Use your own judgement about which changes to a plugin\'s readme are important and need to be included in the docs.');
console.warn('Consider naming of headings, e.g. remove `Swup ` prefix from the page title.');
console.warn('Make sure to keep or restore any existing markdown frontmatter.', '\n');

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
