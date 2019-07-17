/* eslint-disable no-undef */
import { Pool } from 'pg';
// import dotenv from 'dotenv';


const pool = new Pool({
	user: 'uche',
	host: 'localhost',
	database: 'property_pro',
	password: '',
	port: 5432,
});

// dotenv.config();

// const pool = new Pool({
// 	connectionString: process.env.DATABASE_URL
	
// });

export default pool;

