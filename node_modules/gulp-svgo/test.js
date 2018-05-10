import svgo from '.';
import ava from 'ava';
import {File} from 'gulp-util';

const svg = {
    head: '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
    doctype: '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
    body: '<svg width="100%" height="100%" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <rect x="0" y="0" width="42" height="42"/> </svg>'
};

const src = `${svg.head} ${svg.doctype} <!--comment--> ${svg.body}`;
const expected = '<svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M0 0h42v42H0z"/></svg>';

function test(msg, stream, file, assertion) {

    return ava(msg, t => {

        return new Promise(resolve => {

            stream.on('data', data => {
                resolve(assertion(t, data, file));
            });

            stream.write(file);
        });
    });
}

test('passes through non-svg files unaltered', svgo(), new File({
    path: 'some.jpg',
    contents: new Buffer([])
}), (t, data, file) => {
    t.is(data.contents.toString(), file.contents.toString());
});

test('minifies svg', svgo(), new File({
    path: 'some.svg',
    contents: new Buffer(src)
}), (t, data, file) => {
    t.is(data.contents.toString(), expected);
});

test('handles svgo options', svgo({
    plugins: [
        {removeDoctype: false}
    ]
}), new File({
    path: 'some.svg',
    contents: new Buffer(src)
}), (t, data, file) => {
    t.true(data.contents.toString().includes(svg.doctype));
});
