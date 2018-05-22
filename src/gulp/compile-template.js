var gulp = require('gulp');
var twig = require('gulp-twig');

function loadI18n(lang) {
	return require('../i18n/' + lang + '.json');
}

var i18nDefault = 'en';

var i18n = {
	en: loadI18n('en'),
	fr: loadI18n('fr'),
	ru: loadI18n('ru'),
	ch_Sm: loadI18n('ch_Sm'),
	jp: loadI18n('jp'),
	it: loadI18n('it'),
	bu: loadI18n('bu'),
	ge: loadI18n('ge'),
	pr: loadI18n('pr'),
	sp: loadI18n('sp'),
};

gulp.task('compile-template', function () {
    return gulp.src('src/template/*.twig')
        .pipe(twig({
			data: {
				isLogin: true,
				languages: [
					{key: 'en', value: 'English', selected: true},
					{key: 'fr', value: 'French'},
					{key: 'ru', value: 'Russian'},
					{key: 'ch_Sm', value: 'Chinese Simplified'},
					{key: 'jp', value: 'Japanese'},
					{key: 'it', value: 'Italian'},
					{key: 'bu', value: 'Dutch'},
					{key: 'ge', value: 'German'},
					{key: 'pr', value: 'Porteugese'},
					{key: 'sp', value: 'Spanish'},
				],
			},
			functions: [
				{
					name: "t",
					func: function(key) {
						return i18n[i18nDefault][key];
					}
				},
				{
					name: "p",
					func: function(key) {
						return ' data-i18n="' + key + '" ';
					}
				},
				{
					name: "i",
					func: function(key, tag) {
						tag = tag || 'span';

						var value = i18n[i18nDefault][key];
						return '<'+ tag +' data-i18n="' + key + '">' + value + '</'+ tag +'>';
					}
				},
				{
					name: "d",
					func: function(key, name) {
						var value = i18n[i18nDefault][key];
						return name + '="' + value + '" data-i18n-key="' + key + '" data-i18n-name="' + name + '" ';
					}
				},
				{
					name: "setI18nDefault",
					func: function(lang) {
						i18nDefault = lang;
					}
				}
			]
		}))
        .pipe(gulp.dest('./out/website/'))
});

gulp.task('watch-template', function () {
    gulp.watch(['./src/template/**/*', './out/website/svg/**/*'], ['compile-template'])
});
