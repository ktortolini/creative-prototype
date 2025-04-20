(function () {
	'use strict';

	/**
	 * Destructure animation functions from the global Motion instance
	 */
	const { animate, stagger } = Motion;

	/**
	 * Initialize animations when the DOM content is loaded
	 */
	document.addEventListener('DOMContentLoaded', () => {
		const mainSection = document.querySelector('.main-section');
		if (mainSection) {
			animate(
				mainSection.querySelectorAll(':scope > *'),
				{ opacity: [0, 1] },
				{ delay: stagger(0.1), duration: 0.6 },
			);
		}

		const cards = document.querySelectorAll('.card');
		if (cards.length > 0) {
			animate(
				cards,
				{ opacity: [0, 1], y: [20, 0] },
				{ delay: stagger(0.075), duration: 0.7 },
			);
		}

		const contactForm = document.querySelector('#contact-form');
		if (contactForm) {
			animate(
				contactForm.querySelectorAll('.row, .form-control, button'),
				{ opacity: [0, 1], y: [10, 0] },
				{ delay: stagger(0.05), duration: 0.5 },
			);
		}

		const footer = document.querySelector('.footer');
		if (footer) {
			animate(
				footer,
				{ opacity: [0, 1] },
				{ delay: 0.5, duration: 0.6 },
			);
		}
	});
})();
