'use strict';

(() => {
	function handleClick() {
		console.log('Thank you for clicking me!');
	}

	document.querySelector('#test-button').addEventListener(
		'click',
		handleClick,
	);
})();
