import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	connectionString: 'postgres://jtuucwpe:amRj0BBBECleGaS_H2Pyu0xiC7sDoEpI@raja.db.elephantsql.com:5432/jtuucwpe'
});

export default pool;

