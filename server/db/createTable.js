/* eslint-disable no-console */
import pool from '.';
import dotenv from 'dotenv';

// dotenv.config();

// const pool = new Pool({
// 	user: 'uche',
// 	host: 'localhost',
// 	database: 'property_pro',
// 	password: '',
// 	port: 5432,
// });

// pool.on('connect', () => {
// 	console.log('connected to database');
// });

const tablesQuerry = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS property CASCADE;
    DROP TABLE IF EXISTS flag CASCADE;
    
    CREATE TABLE users(
             id SERIAL PRIMARY KEY,
             email VARCHAR UNIQUE NOT NULL,
             first_name VARCHAR NOT NULL,
             last_name VARCHAR NOT NULL,
             password VARCHAR NOT NULL,
             address VARCHAR NOT NULL,
             is_admin BOOLEAN DEFAULT 'false'
    );
    
    CREATE TABLE property(
             id SERIAL PRIMARY KEY,
             owner INT NOT NULL,
             status VARCHAR NOT NULL DEFAULT 'available',
             price FLOAT(2) NOT NULL,
             state VARCHAR NOT NULL,
             city VARCHAR NOT NULL,
             address VARCHAR NOT NULL,
             type VARCHAR NOT NULL,
             created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'WAT'),
             image_url VARCHAR NOT NULL
    );
    
    CREATE TABLE flag(
             id SERIAL PRIMARY KEY,
             property_id BIGINT NOT NULL,
             created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'WAT'),
             reason VARCHAR NOT NULL,
             description VARCHAR NOT NULL
    );
    ALTER TABLE "property" ADD FOREIGN KEY ("owner") REFERENCES "users" ("id");
`;


const createTable = () => {
	console.log('called');
	pool.query(`${tablesQuerry}`).then(() => {
		console.log('Tables created successfully');
	});
};
      

createTable();