# Changelog

## 1.0.5 (2017-10-13)

Improvements:

- merged pull request #5
  + Fix for broken Inlined SVG and imageurl

## 1.0.4 (2017-08-11)

Improvements:

- merged pull request #2
  + Fixed missed escape of round parentheses within SVG images

## 1.0.3 (2017-07-27)

Improvements:

- merged pull request #1
  + Don't encode svg data in base64, but output escaped utf8 version
- added .npmignore file

## 1.0.2 (2016-04-27)

Bugfixes:

  - removed check for function exists due to update in libsass (https://github.com/sass/libsass/issues/1550)

## 1.0.1 (2016-02-11)

Improvements:

  - updated image-size plugin for better SVG dimension lookup
  - added jscs for linting

## 1.0.0 (2016-02-10)

Fork from [gulp-compass-imagehelper](https://github.com/phlppschrr/gulp-compass-imagehelper)

Bugfixes:

  - replacing @ for imageInfo.fullname with - due to issues

Improvements:

  - using line instead of block comments to prevent output on Sass compile
  - using hypens instead of underscores
  - using single quotes for strings
  - moved image path prefix into a variable
  - fixed indentation for output
  - removed unused lines
  - always using brackets for conditions in JS
  - removed console.log from svg size detection
  - added pretty notice message if dimension of svg can not be determined
  - set encoding in global variable and use for file content string encoding
  - some code formatting
  - improved mustache template helper functions
  - wrapped every function in mustache template inside a function-exists check

Features:

  - added options to disable placeholder and inline-images
  - updated mustache template to reflect new options
