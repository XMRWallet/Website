# gulp-sass-image
> [Gulp](https://github.com/gulpjs/gulp) plugin for polyfilling the compass imagehelper functions to node-sass enviroments.

This plugin generates a helper .scss file, which you have to @import into your own sass project. The generated sass file acts as a polyfill: 
Inside the generated file is a sass map which contains all the image infos including a inlined data version. 
The default mustache template also outputs %placeholders for each image. Feel free to modify the template to your needs.
Additional there are the following helper function which mimic the native functions from Compass:

## Supported Compass functions
* **inline-image($image):** Embeds the contents of an image directly inside your stylesheet. All images are currently base64 encoded, in a future version SVG images will be UTF-8 encoded.
* **image-width($image):** Returns the width of the image found at the path supplied by $image. Warning, some SVG images may fail here and return `null`.
* **image-height($image)** Returns the height of the image found at the path supplied by $image. Warning, some SVG images may fail here and return `null`.
* **image-url($image, $only-path: false, $cache-buster: false)**  
  Generates a path to an asset found relative to the project's images directory.
  Passing a true value as the second argument will cause only the path to be returned instead of a url() function
  The third argument is used to control the cache buster on a per-use basis. When set to false no cache buster will be used. When true a md5-hash of the file is appended to the url. When a string, that value will be used as the cache buster. Be sure to set `images_path` and `css_path` options.
* **image-exists($image):** Returns true if the image exists in our helper file. (Not part of compass, but still its here)

## Install
```shell
npm install gulp-sass-image --save-dev
```

## Example Usage
```javascript
var sassImage = require('gulp-sass-image');

gulp.task('sass-image', function () {
    return gulp.src('_sources/images/**/*.+(jpeg|jpg|png|gif|svg)')
        .pipe(compassImagehelper({
            targetFile: '_generated-imagehelper.scss', // default target filename is '_sass-image.scss'
            // template: 'your-sass-image-template.mustache',
            images_path: 'assets/images/',
            css_path: 'assets/css/',
            prefix: 'icon-'
        }))
        .pipe(gulp.dest('sass'));
});
```

**For a working usage example look into the included [example project](./example/).**

## Options
* **template** Path to your custom mustache template.
* **targetFile** Destination file name
* **images_path** The path to your images folder
* **css_path** The path to your css folder. This is needed to calculate relative paths
* **http_images_path** The full http path to images on the web server. 
  e.g. when set to *'/assets/images/'* image-url('icon.png') will return *'url("/assets/images/icon.png")'*
* **prefix** Optional *prefix* string which can be used in the mustache template
* **includeData** By default the base64 encoded data of the images will be placed in the image hash. If you want don't inline your images you can set this to *false* to disable inline-images. If you are using your own template you have to implement the condition for this to work.
* **createPlaceholder** By default placeholder will be created that can be used with *@extended*. If you don't need this placeholder classes you can set this option to *false* to disable it. If you are using your own template you have to implement the condition for this to work.

## Template variables
Your mustache template can use all of theses properties. The default template only uses a subset from this.
* ```items``` Array of images data
* ```items[i].data``` Data URI string
* ```items[i].width``` Image width in pixels;
* ```items[i].height``` Image height in pixels;
* ```items[i].filename``` Filename with extension;
* ```items[i].basename``` Filename without extension;
* ```items[i].dirname``` Name of the images parent directory;
* ```items[i].ext``` File Extension including dot, e.g. '.png';
* ```items[i].path``` Filepath relative to the project's images directory.
* ```items[i].fullname``` Same as path, but directory separators and dots are replaced by '-'. Useful if you want to generate unique named placeholders.
* ```items[i].mime``` MIME-Type of the file
* ```items[i].hash``` MD5 Hash of the file, used for cache-busting

## Credits
* Thanks to [Philipp Schreier](https://github.com/phlppschrr) who built this plugin initially as [gulp-compass-imagehelper](https://github.com/phlppschrr/gulp-compass-imagehelper)
* Thanks to Hugo Giraudel: I included two sass functions for casting string to number [found in his blog post.](http://hugogiraudel.com/2014/01/15/sass-string-to-number/) 
* The icons in the example directory are taken from [Google/Material Design Icons](https://github.com/google/material-design-icons)
* Some code lines are taken from [https://github.com/Sunify/gulp-baseimg](https://github.com/Sunify/gulp-baseimg)

### License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
