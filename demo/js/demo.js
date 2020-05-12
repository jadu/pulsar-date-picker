const $ = require('jquery');
window.jQuery = $;
const DatePickerFactory = require('../../src/js/DatePickerFactory');

$(function () {
    const $html = $('html');
    const datePicker = DatePickerFactory.create();
    datePicker.init($html);
});
