// Download readmes from plugin repos on GitHub

console.log('Downloading readmes from plugin repositories...', '\n');

var http = require("https");
var fs = require("fs");

var server = "https://raw.githubusercontent.com";
var org = "swup";
var dir = "docs/plugins/";
var downloadCount = 0;
var processedCount = 0;

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
  download(url, dest, function (message, success = true) {
    console.log(message || "✔︎ Downloaded " + plugin + " readme");
    if( success ) {
      downloadCount ++;
    }
    processedCount ++;
    if( processedCount === plugins.length ) {
      logCompleteMessage();
    }
  });
}

function download(url, dest, cb) {
  var {frontMatter, title} = getExistingFrontMatterAndTitle(dest);
  
  var request = http
    .get(url, function (response) {
      if( response.statusCode === 404 ) {
        cb('🚨 plugin not found: ' + url, false);
        return;
      }
      var file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on("finish", function () {
        file.close(cb);
        injectExistingFrontmatterAndTitle(dest, frontMatter, title);
      });
    })
    .on("error", function (err) {
      cb(err.message, false);
    });
}

function logCompleteMessage() {
  console.log('\n✔︎ Successfully downloaded '+ downloadCount + ' plugin readmes.', '\n');

  console.warn('🚨 This is NOT an automatic process!', '\n');
  console.warn('Use your own judgement about which changes to a plugin\'s readme are important and need to be included in the docs.');
  console.warn('Consider the naming of headings, e.g. remove the `Swup ` prefix from the page title.');
  console.warn('Make sure to keep or restore any existing markdown frontmatter.', '\n');
}

function getExistingFrontMatterAndTitle(path) {
  var fileContents = fs.readFileSync(path, 'utf-8');
  var frontMatterMatch = fileContents.match(/(^\s*---.*---\s*$)/ms);
  var titleMatch = fileContents.match(/^\s*---.*---\s*$.+?(#.*?$)/ms);
  return {
    frontMatter: frontMatterMatch ? frontMatterMatch[1] : '',
    title: titleMatch ? titleMatch[1] : ''
  };
}

function injectExistingFrontmatterAndTitle(path, frontMatter, title) {
  var fileContents = fs.readFileSync(path, 'utf-8');
  if( title ) fileContents = fileContents.replace(/^#.+?$/m, title)
  if( frontMatter ) fileContents = frontMatter + '\n' + fileContents;
  fs.writeFileSync(path, fileContents);
}