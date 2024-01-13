
const { Pool } = require('pg');

require('dotenv').config();


const db = new Pool({
    connectionString: process.env.DATABASE_URI,
});


const createTable = async () => {
    try {

        const result = await db.query('SELECT to_regclass(\'users\')');


        if (!result.rows[0].to_regclass) {
            await db.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(50),
                    password VARCHAR(100),
                    first_name VARCHAR(50),
                    last_name VARCHAR(50),
                    birthday DATE
                );
            `);

            console.log('Tabla "users" creada exitosamente.');
        } else {
            console.log('La tabla "users" ya existe.');
        }
    } catch (error) {
        console.error('Error al crear la tabla "users":', error);
    } finally {

        await db.end();
    }
};


createTable();


module.exports = db;
