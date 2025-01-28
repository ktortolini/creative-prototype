import nodemailer from '@nodemailer';
import '@std/dotenv/load'; /* auto-load */

export async function sendMessage(sub: string, txt: string) {
	const transporter = nodemailer.createTransport({
		host: Deno.env.get('MAIL_HOST'),
		port: Deno.env.get('MAIL_PORT'),
		secure: Deno.env.get('MAIL_SECURE'),
		auth: {
			user: Deno.env.get('MAIL_USERNAME'),
			pass: Deno.env.get('MAIL_PASSWORD'),
		},
		requireTLS: Deno.env.get('MAIL_TLS'),
	});

	const message = {
		from: Deno.env.get('MESSAGE_FROM'),
		to: Deno.env.get('MESSAGE_TO'),
		subject: sub,
		text: txt,
	};

	await transporter
		.sendMail(message)
		.then(() => {
			console.log('Message sent');
		})
		.catch((_: Error) => {
			console.error(_.message);
		});
}
