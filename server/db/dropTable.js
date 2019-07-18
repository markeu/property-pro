import pool from '.';

const dropTables = () => {
	const queryText = `DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS property CASCADE;
  DROP TABLE IF EXISTS flag CASCADE;
  DROP TABLE IF EXISTS roles CASCADE;`;
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