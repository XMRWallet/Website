# gulp-svgo

[![NPM Version](https://img.shields.io/npm/v/gulp-svgo.svg?style=flat-square)](http://npmjs.com/package/gulp-svgo) [![NPM Downloads](https://img.shields.io/npm/dm/gulp-svgo.svg?style=flat-square&colorB=007ec6)](http://npmjs.com/package/gulp-svgo) [![Build Status](https://img.shields.io/travis/corneliusio/gulp-svgo/master.svg?style=flat-square)](https://travis-ci.org/corneliusio/gulp-svgo)

Optimizing SVG vector graphics files with Gulp

A thin wrapper around [svgo](https://www.npmjs.com/package/svgo) for Gulp. Will pass-through any non-svg files unaltered so you can use in conjuction with other image optimzation tools if you don't want a separate task for different file formats.

## Install

```
$ npm install --save-dev gulp-svgo
```


## Usage

```js
let gulp = require('gulp'),
    svgo = require('gulp-svgo');

gulp.task('images', () => {

    return gulp.src('src/img/*')
        .pipe(svgo())
        .pipe(gulp.dest('dest/img'));
});
```


## Options

Options are passed directly to [svgo](https://www.npmjs.com/package/svgo) instance.
