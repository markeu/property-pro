import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	user: 'uche',
	host: 'localhost',
	database: 'property_pro',
	password: '',
	port: 5432,
});

export default pool;

