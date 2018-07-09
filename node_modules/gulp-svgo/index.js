'use strict';

let path = require('path'),
    Stream = require('stream'),
    SVGO = require('svgo');

module.exports = options => {

    let stream = new Stream.Transform({objectMode: true}),
        settings = options || {},
        svgo = new SVGO(settings);

    stream._transform = (file, encoding, next) => {

        if (path.extname(file.path).toLowerCase() !== '.svg' || !file.contents.toString('utf8')) {
            return next(null, file);
        }

        if (file.isStream()) {
            return next(null, file);
        }

        if (file.isBuffer()) {
            svgo.optimize(file.contents.toString('utf8'), {path: file.path}).then(result => {
                file.contents = Buffer.from(result.data);

                return next(null, file);
            });
        }
    };

    return stream;
};
