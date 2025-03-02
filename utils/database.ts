/**
 * @file utils/database.ts
 * @author Your Name
 *
 * @name ~GenArtNFT Database Utilities~
 * @date on December 27, 2024
 * @copyright Copyright (c) 2024. All rights reserved.
 * @description Database connection and query utilities for the GenArtNFT application.
 *
 * @requires @mysql2/promise, @std/dotenv
 */

import * as mysql from '@mysql2/promise';
import '@std/dotenv/load'; /* auto-load */

let pool: mysql.Pool;

const config = {
	server: 'digitalocean',
	host: Deno.env.get('DO_MYSQL_HOST'),
	user: Deno.env.get('DO_MYSQL_USER'),
	password: atob(Deno.env.get('DO_MYSQL_PASSWORD') || ''),
	database: Deno.env.get('DO_MYSQL_DATABASE'),
	port: Number(Deno.env.get('DO_MYSQL_PORT') || '25060'),
};

export function connect(): Promise<mysql.Pool> {
	if (pool) {
		return Promise.resolve(pool);
	}

	try {
		pool = mysql.createPool({
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
			port: config.port,
			connectTimeout: 60000,
		});
		console.log('MySQL connection pool created successfully');
		return Promise.resolve(pool);
	} catch (error) {
		console.error('Error creating MySQL connection pool:', error);
		throw error;
	}
}

export async function getAllProjects() {
	try {
		// Ensure pool is initialized
		if (!pool) {
			await connect();
		}

		console.log('Executing query: SELECT * FROM projects');
		// deno-lint-ignore no-explicit-any
		const [rows]: any = await pool.execute<mysql.RowDataPacket[]>(
			'SELECT * FROM projects',
		);
		console.log(`Query returned ${rows.length} projects`);
		return rows;
	} catch (error) {
		console.error('Error executing getAllProjects query:', error);
		throw error;
	}
}
