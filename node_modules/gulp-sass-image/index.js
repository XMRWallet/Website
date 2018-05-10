var fs = require('fs');
var path = require('canonical-path');
var gutil = require('gulp-util');
var Through = require('through');
var mustache = require('mustache');
var sizeOf = require('image-size');
var mime = require('mime');
var md5 = require('md5');
var SVGO = require('svgo');
var svgo = new SVGO();
var appRoot = require('app-root-path').path;

module.exports = function(options) {
  'use strict';

  var images = [];

  if (!options) {
    options = {};
  }

  if (!options.template) {
    options.template = path.join(__dirname, 'sass-image-template.mustache');
  }

  if (options.includeData !== false) {
    options.includeData = true;
  }

  if (options.createPlaceholder !== false) {
    options.createPlaceholder = true;
  }

  if (!options.targetFile) {
    options.targetFile = '_sass-image.scss';
  }

  if (!options.prefix) {
    options.prefix = '';
  }

  var template = fs.readFileSync(options.template).toString();

  var pathPrefix = function() {
    var result = '';
    if (options.http_images_path) {
      result = options.http_images_path;
    } else if (options.css_path && options.images_path) {
      // Relative path from css folder to images
      result = path.relative(options.css_path, options.images_path);
    } else if (options.images_path) {
      // Relative from project url
      result = path.relative(appRoot, options.images_path);
    }

    // Make sure pathPrefix ends with a trailing slash
    if (result && result.substr(-1) != '/') {
      result = result + '/';
    }

    return result;
  };

  var isSet = function(val) {
    return typeof val !== 'undefined' && val !== null;
  };

  var getSvgDimensions = function(file) {
    var dimensions = {
      width: undefined,
      height: undefined,
    };

    try {
      dimensions = sizeOf(file.path);
    } catch (e) {
      // Could not read width/height from svg. Try again with the slower svgo parser:
      svgo.optimize(file.contents.toString(), function(res) {
        // Check if dimensions could be read, log notice if not
        if (!isSet(res) || !isSet(res.info) || !isSet(res.info.width) || !isSet(res.info.height)) {
          var filePath = path.relative(options.images_path, file.path);
          gutil.log(
            gutil.colors.yellow('NOTICE'),
            'Image Dimensions could not be determined for:',
            gutil.colors.cyan(filePath)
          );
          return;
        }
        dimensions = {
          width: res.info.width,
          height: res.info.height,
        };
      });
    }

    return dimensions;
  };

  var bufferContents = function(file) {
    if (!options.images_path) {
      // Autodetect images_path with the first file
      options.images_path = path.relative(appRoot, file.base);
    }

    var imageInfo = {};
    var encoding = 'base64';
    var data;

    var mimetype = mime.lookup(file.path);
    var dimensions;

    if (mimetype == 'image/svg+xml') {
      dimensions = getSvgDimensions(file);
      encoding = 'charset=utf8';
      data = file.contents.toString('utf8');
      data = data.replace(/'/g, '"');
      data = data.replace(/\s+/g, " ");
      data = data.replace(/[\(\){}\|\\\^~\[\]`"<>#%]/g, function(match) {
        return '%'+match[0].charCodeAt(0).toString(16).toUpperCase();
      });

    } else {
      dimensions = sizeOf(file.path);
      data = file.contents.toString(encoding);
    }

    imageInfo.width     = dimensions.width;
    imageInfo.height    = dimensions.height;
    imageInfo.mime      = mimetype;
    imageInfo.filename  = path.basename(file.path);
    imageInfo.basename  = path.basename(file.path, path.extname(file.path));
    imageInfo.dirname   = path.basename(path.dirname(file.path));
    imageInfo.ext       = path.extname(file.path);
    imageInfo.path      = path.relative(options.images_path, file.path);
    // Replace /, \, . and @ with -
    imageInfo.fullname  = imageInfo.path.replace(/[\/\\\.@]/g, '-');
    imageInfo.hash      = md5(file.contents);
    imageInfo.data      = 'url("data:' + mimetype + ';' + encoding + ',' + data + '")';

    images.push(imageInfo);
  };

  var endStream = function() {
    this.emit('data', new gutil.File({
      contents: new Buffer(mustache.render(template, {
        prefix: options.prefix,
        path_prefix: pathPrefix(),
        items: images,
        includeData: options.includeData,
        createPlaceholder: options.createPlaceholder,
      }), 'utf8'),
      path: options.targetFile,
    }));
    this.emit('end');
  };

  return new Through(bufferContents, endStream);
};
