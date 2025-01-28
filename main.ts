import express from '@express';
import * as utils from './utils/utils.ts';

const app: express.Application = express();
const port: number = 8000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (_: express.Request, res: express.Response) => {
	res.sendFile('index.html');
});

app.post('/mail', async (req: express.Request, res: express.Response) => {
	await utils
		.sendMessage(req.body.sub, req.body.txt)
		.then(() => {
			res.send({ result: 'success' });
		})
		.catch((_: Error) => {
			res.send({ result: _.message });
		});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
