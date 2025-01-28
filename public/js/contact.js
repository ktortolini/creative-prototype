(function () {
	'use strict';

	const form = document.querySelector('#contact-form');

	document.querySelector('#send-contact').addEventListener(
		'click',
		(event) => {
			event.preventDefault();
			event.stopPropagation();
			let formValid = true;
			if (!form.checkValidity()) {
				formValid = false;
			}
			form.classList.add('was-validated');
			if (formValid) {
				sendTheEmail();
			}
		},
	);

	function sendTheEmail() {
		console.log('You clicked the submit button.');
		const firstName = document.querySelector('#contact-first').value;
		const lastName = document.querySelector('#contact-last').value;
		const email = document.querySelector('#contact-email-addr').value;
		const message = document.querySelector('#contact-question').value;
		console.log('First name: ' + firstName);
		console.log('Last name: ' + lastName);
		console.log('Email: ' + email);
		console.log('Message: ' + message);

		const obj = {
			sub: 'Someone submitted a contact form!',
			txt: `${firstName} ${lastName} sent you a message that reads ${message}. Their email address is ${email}`,
		};

		fetch('/mail', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(obj),
		})
			.then((r) => r.json())
			.then((response) => {
				document.querySelector('#contact-button-response').textContent =
					response.result;
			})
			.then(() => {
				setTimeout(() => {
					document.querySelector('#contact-button-response')
						.textContent = '';
				}, '5000');
			})
			.catch((_) => {
				console.error(_.message);
			});
	}
})();
