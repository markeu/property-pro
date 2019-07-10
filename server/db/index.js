import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	username: 'postgres',
	host: 'local host',
	database: 'postgres',
	password: 12345,
	port: 5432,
});

export default {
/**
 * DB Query
 * @param { object } req
 * @param { object } res
 * @param { object } object
 */
	query(text, params) {
		return new Promise((resolve, reject) => {
			pool.query(text, params)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
};

