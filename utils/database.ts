import * as mysql from '@mysql2/promise';
import '@std/dotenv/load'; /* auto-load */

let pool: mysql.Pool;

const __password = atob(Deno.env.get('MYSQL_PASSWORD') || '');

export function connect(): Promise<mysql.Pool> {
	// deno-fmt-ignore
	const _cString = 
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

	pool = mysql.createPool({
		/**
		 * todo(ktortolini): changing this to 'cString' when we deploy
		 */
		user: Deno.env.get('MYSQL_USER'),
		password: __password,
		host: Deno.env.get('MYSQL_HOST'),
		port: parseInt(Deno.env.get('MYSQL_PORT') || '3306'),
		database: Deno.env.get('MYSQL_DATABASE'),
	});

	return Promise.resolve(pool);
}

export async function getAllProjects() {
	// deno-lint-ignore no-explicit-any
	const [rows]: any = await pool.execute<mysql.RowDataPacket[]>(
		'SELECT * FROM projects',
	);
	return rows;
}
