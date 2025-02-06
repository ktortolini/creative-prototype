import express from '@express';
import * as utils from './utils/utils.ts';
import { blue, green } from '@std/fmt/colors';

const app: express.Application = express();
const port: number = 8000;

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (_: express.Request, res: express.Response) => {
	res.render('index.ejs');
});

app.get('/project', (_: express.Request, res: express.Response) => {
	res.render('project.ejs');
});

app.get('/projects', (_: express.Request, res: express.Response) => {
	res.render('projects.ejs');
});

app.get('/contact', (_: express.Request, res: express.Response) => {
	res.render('contact.ejs');
});

app.post('/mail', async (req: express.Request, res: express.Response) => {
	await utils
		.sendMessage(req.body.sub, req.body.txt)
		.then(() => {
			res.send({ result: '🎉 success!' });
		})
		.catch((_: Error) => {
			res.send({ result: '🧯 ' + _.message });
		});
});

app.listen(port, () => {
	// deno-fmt-ignore
	console.info(
		'🎉 ' + green('Example app listening on port ') + blue(String(port)),
	);
	// deno-fmt-ignore
	console.info(
		'🎉 ' + green('Please click ') + blue(new URL('http://localhost:' + String(port)).href),
	);
});
