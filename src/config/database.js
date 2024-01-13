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


        fs.writeFileSync('./data.sql', 'CREATE TABLE users(...);', 'utf8');

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
