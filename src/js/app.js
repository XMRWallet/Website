window.dialogPolyfill = require('../../node_modules/dialog-polyfill/dialog-polyfill');
window.$ = window.jQuery = require('./jquery.js');
window.select2 = require('./select2.js')(window.$);

window.i18n = require('./jquery.i18n.js');
$.i18n.add('en', require('../i18n/en.json'));
$.i18n.add('fr', require('../i18n/fr.json'));
$.i18n.add('ru', require('../i18n/ru.json'));
$.i18n.add('ch_Sm', require('../i18n/ch_Sm.json'));
$.i18n.add('jp', require('../i18n/jp.json'));
$.i18n.add('it', require('../i18n/it.json'));
$.i18n.add('bu', require('../i18n/bu.json'));
$.i18n.add('ge', require('../i18n/ge.json'));
$.i18n.add('pr', require('../i18n/pr.json'));
$.i18n.add('sp', require('../i18n/sp.json'));

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (!requestAnimationFrame) {
	requestAnimationFrame = function(callback) {
		setTimeout(callback, 1000 / 60);
	}
}

function formatState (state) {
	if (!state.id) {
		return state.text;
	}
	var baseUrl = "/i/flags";
	var $state = $(
		'<span class="select2-flags"><img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
	);
	return $state;
};

window.dashboardShowModal = function dashboardShowModal(selector) {
	var dialogs = $(selector);
	if(!dialogs.length) {
		return;
	}
	var dialog = dialogs[0];
	dialogPolyfill.registerDialog(dialog);

	dialog.showModal();
};

$(function() {
            $('.js-select-footer, .js-select-landing')
                .val($.i18n.getLang())
                .on('change', function() {
                    $.i18n.setLang($(this).val() || 'en');
                    $.i18n.dom($('body'));
                });
            $.i18n.dom($('body'));

            $('.dashboard-menu-burger').on('click', function() {
                $('.dashboard-menu').toggleClass('close');
            });

            $('.js-select-footer').select2({
                width: '174px',
                minimumResultsForSearch: Infinity,
                theme: "footer",
                templateSelection: formatState,
                templateResult: formatState,
            });

            $('.js-select-landing').select2({
                minimumResultsForSearch: Infinity,
                width: '174px',
                theme: "landing",
                templateSelection: formatState,
                templateResult: formatState,
            });
        });