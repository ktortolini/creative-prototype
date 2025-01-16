import express from '@express';

const app: express.Application = express();
const port: number = 8000;

app.use(express.static('public'));

app.get('/', (_: express.Request, res: express.Response) => {
	res.sendFile('index.html');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
