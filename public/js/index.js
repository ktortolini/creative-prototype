(function () {
	'use strict';

	/**
	 * Add the animate function from the global motion instance
	 */
	const { animate } = Motion;

	/**
	 * Add the hero content element using specifiers
	 */
	const heroContent = document.querySelector('.hero-section .container');

	/**
	 * Check if the hero content element exists
	 */
	if (heroContent) {
		/**
		 * Set the initial state of the hero content element
		 */
		heroContent.style.opacity = '0';
		heroContent.style.transform = 'translateY(20px)';

		/**
		 * Apply a fade in transition to the hero content element
		 */
		animate(heroContent, {
			opacity: [0, 1],
			y: [20, 0],
		}, {
			duration: 0.75,
			easing: 'ease-linear',
		});
	}
})();
