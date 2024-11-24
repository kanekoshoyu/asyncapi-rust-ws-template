"use strict";

function format(generator) {
	// add code formatting here
	// - cargo fmt
	console.log('generation complete')
}

module.exports = {
	'generate:after': generator => format
};
