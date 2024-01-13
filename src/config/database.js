const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const db = new Pool({
    connectionString: process.env.DATABASE_URI,
});

const createTable = async () => {
    let client;
    try {
        client = await db.connect();
        console.log('Conexión a la base de datos exitosa');


        fs.writeFileSync(
            './data.sql', 'CREATE TABLE users( id SERIAL PRIMARY KEY, email VARCHAR(50),password VARCHAR(100),first_name VARCHAR(50),last_name VARCHAR(50),birthday DATE);', 'utf8');

    } catch (error) {
        console.log('Error al conectarse a la base de datos: ', error);
    } finally {
        if (client) {
            client.release();
        }
    }
};
createTable();
module.exports = db;
