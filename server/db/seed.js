
import pool from '../db/index';



/**
 * Insert super admin after tables are created
 * @name insertSeed
 * @returns {String} details of insert
 */
const insertSeed = async () => {
    const rows = await pool.query(`INSERT INTO users
    (first_name, last_name, password, email, address, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`, ['uche', 'mark', 'password', 'uche@gmail.com', 'adenekan', false]);
};

insertSeed();
