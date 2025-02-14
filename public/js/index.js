(function () {
	'use strict';

	/**
	 * Initial wallet connection
	 */

	connectWallet();

	/**
	 * Add the user address variable
	 */

	let userAddress = null;

	/**
	 * Add the animate function from the global motion instance
	 */
	const { animate } = Motion;

	/**
	 * Add the connect wallet button element using specifiers
	 */

	const connect = document.getElementById('wallet-connect');

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

	/**
	 * Add an event listener to the connect wallet button element
	 */

	connect.addEventListener('click', () => {
		connectWallet();
	});

	async function connectWallet() {
		await globalThis.ethereum
			.request({ method: 'eth_requestAccounts' })
			.then((data) => {
				userAddress = data[0];
				const walletString = userAddress.substring(0, 5) + '...' +
					userAddress.substring(38, 42);
				connect.innerHTML = walletString;
				return userAddress;
			})
			.catch((_) => {
				if (_.code === 4001) {
					/**
					 * 4001 - The user rejected the connection request.
					 */
					// deno-fmt-ignore
					console.info(
						'🧯 ' + 'Please connect a wallet.',
					);
				} else {
					console.error(_.message);
				}
			});
	}
})();
