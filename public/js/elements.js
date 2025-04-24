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
		initFadeInAnimations();
		initSmoothScrollAnchors();
	});

	function initFadeInAnimations() {
		const heroSection = document.querySelector('.hero-section');
		if (heroSection) {
			animate(
				heroSection.querySelectorAll(':scope > *'),
				{ opacity: [0, 1] },
				{ delay: stagger(0.1), duration: 0.6 },
			);
		}

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
	}

	function initSmoothScrollAnchors() {
		const anchorLinks = document.querySelectorAll('a[href^="#"]');

		anchorLinks.forEach((link) => {
			link.addEventListener('click', function (e) {
				e.preventDefault();

				const targetId = this.getAttribute('href').substring(1);
				if (!targetId) return;

				const targetElement = document.getElementById(targetId);
				if (!targetElement) return;

				const targetPosition =
					targetElement.getBoundingClientRect().top +
					globalThis.scrollY;
				const startPosition = globalThis.scrollY;

				const scrollAnimation = animate(
					document.documentElement,
					{
						scrollTop: [startPosition, targetPosition],
					},
					{
						type: 'spring',
						stiffness: 80,
						damping: 20,
						restSpeed: 0.5,
						restDelta: 1,
						duration: 1,
						onUpdate: (latest) => {
							globalThis.scrollTo(0, latest.scrollTop);
						},
					},
				);

				scrollAnimation.finished.then(() => {
					const heading = targetElement.querySelector(
						'.section-title',
					);
					if (heading) {
						animate(
							heading,
							{ scale: [1, 1.05, 1] },
							{ duration: 0.6, easing: [0.22, 1, 0.36, 1] },
						);

						const underline = heading.querySelector(':after');
						if (underline) {
							animate(
								underline,
								{ width: [0, 100] },
								{ duration: 0.6, delay: 0.2 },
							);
						}
					}

					animate(
						targetElement,
						{
							boxShadow: [
								'0 0 0px rgba(0,0,0,0)',
								'0 0 20px rgba(0,0,0,0.1)',
								'0 0 0px rgba(0,0,0,0)',
							],
						},
						{ duration: 1.5 },
					);
				});
			});
		});
	}
})();
