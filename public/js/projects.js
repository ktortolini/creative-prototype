(function () {
	'use strict';

	/**
	 * Add the animate function from the global motion instance
	 */
	const { animate } = Motion;

	/**
	 * Add the hero content and CTA card elements using specifiers
	 */
	const ctaCards = document.querySelectorAll('.card');

	/**
	 * Animate each CTA card with a fade in effect
	 */
	if (ctaCards) {
		ctaCards.forEach((card, _) => {
			card.style.opacity = '0';
			card.style.transform = 'translateY(20px)';

			animate(card, {
				opacity: [0, 1],
				y: [20, 0],
			}, {
				duration: 0.75,
				easing: 'ease-linear',
			});
		});
	}
})();
