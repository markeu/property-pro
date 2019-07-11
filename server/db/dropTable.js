import pool from '.';

const dropTables = () => {
	const queryText = `DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS property;
  DROP TABLE IF EXISTS flag;`;
	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

dropTables();