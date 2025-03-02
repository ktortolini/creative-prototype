import cors from '@cors';
import express from '@express';
import * as utils from './utils/utils.ts';
import * as db from './utils/database.ts';
import { blue, green } from '@std/fmt/colors';
// deno-lint-ignore no-explicit-any
let projects: any[] = [];

const app: express.Application = express();
const port: number = 8000;

app.use(cors());
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

// deno-fmt-ignore
app.get('/', async (_: express.Request, res: express.Response, next: express.NextFunction) => {
	await db.connect()
		.then(async () => {
			projects = await db.getAllProjects();
			const featuredRand = Math.floor(Math.random() * projects.length);
			res.render('index.ejs', {
				featuredProject: projects[featuredRand],
			});
		})
		.catch((_: Error) => {
			console.error(_.message);
			next(_ as Error);
		});
});

app.get('/projects', (_: express.Request, res: express.Response) => {
	res.render('projects.ejs', { projectArray: projects });
});

app.get('/project/:id', (req: express.Request, res: express.Response) => {
	const id = req.params.id;
	if (id > projects.length) {
		throw new Error('No project with that ID');
	}
	console.log(projects[id - 1], id);
	res.render('project.ejs', { project: projects[id - 1], which: id });
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

app.use(
	// deno-fmt-ignore
	// deno-lint-ignore no-unused-vars
	async (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
		console.log(err);
		let msg: string;
		msg = err.message;
		if (msg != 'No project with that ID') {
			msg =
				'There was an internal error. Apologies. We are working on cleaning up the mess.';
		}
		await res.render('error.ejs', { msg: msg });
	},
);

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
