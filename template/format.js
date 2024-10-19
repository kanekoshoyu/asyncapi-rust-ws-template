"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascalcase = pascalcase;
exports.camelcase = camelcase;
exports.underscore = underscore;
// ThisForm
function pascalcase(s) {
    // Replace underscores and spaces, and capitalize the first character
    return s
        .replace(/(_|\s)+/g, ' ') // Replace underscores and spaces with a single space
        .split(' ') // Split by spaces to process each word
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(''); // Join the words without spaces
}
// thisForm
function camelcase(s) {
    return s.replace('_', '').replace(' ', '');
}
// this_form
function underscore(s) {
    return s.replace(' ', '_').toLowerCase();
}
