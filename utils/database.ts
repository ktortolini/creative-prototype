import * as mysql from '@mysql2/promise';
import '@std/dotenv/load'; /* auto-load */

let pool: mysql.Pool;

const __password = atob(Deno.env.get('MYSQL_PASSWORD') || '');

export function connect(): Promise<mysql.Pool> {
	// deno-fmt-ignore
	const cString = 
      'mysql://' +
      Deno.env.get('MYSQL_USER') +
      ':' +
      __password +
      '@' +
      Deno.env.get('MYSQL_HOST') +
		':' +
		Deno.env.get('MYSQL_PORT') +
		'/' +
		Deno.env.get('MYSQL_DATABASE');

	pool = mysql.createPool(cString);

	return Promise.resolve(pool);
}

export async function getAllProjects() {
	// deno-lint-ignore no-explicit-any
	const [rows]: any = await pool.execute<mysql.RowDataPacket[]>(
		'SELECT * FROM projects',
	);
	return rows;
}
