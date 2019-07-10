/* eslint-disable no-console */
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

pool.on('connect', () => {
	console.log('connected to database');
});

const tableBuild = () => {
	const queryTask = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS property CASCADE;
    DROP TABLE IF EXISTS flag CASCADE;
    
    CREATE TABLE users(
            "id" BIGSERIAL PRIMARYKEY,
            "email" VARCHAR UNIQUE NOT NULL,
            "first_name" VARCHAR NOT NULL,
            "last_name" VARCHAR NOT NULL,
            "phone_number" VARCHAR NOT NULL,
            "address" VARCHAR NOT NULL,
            "is_admin" BOOLEAN DEFAULT 'false'
    );
    
    CREATE TABLE property(
            "id" BIGSERIAL PRIMARY KEY,
            "owner" INT NOT NULL,
            "status" VARCHAR NOT NULL DEFAULT 'available',
            "price" FLOAT(2) NOT NULL,
            "state" VARCHAR NOT NULL,
            "city" VARCHAR NOT NULL,
            "address" VARCHAR NOT NULL,
            "type "VARCHAR NOT NULL,
            "created_on" TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'WAT'),
            "image_url" VARCHAR NOT NULL
    );
    
    CREATE TABLE flag(
            "id" BIGSERIAL NOT NULL PRIMARY KEY,
            "property_id" BIGINT NOT NULL,
            "created_on" TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'WAT'),
            "reason" VARCHAR NOT NULL,
            "description" VARCHAR NOT NULL
    );
`;

	pool.query(queryTask)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

export default tableBuild();