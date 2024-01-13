require('dotenv').config();

const { Pool } = require('pg')
const fs = require('fs')

const db = new Pool({
    connectionString: process.env.DATABASE_URI,
});



const createTable = async () => {
    try {
        fs.writeFileSync('./data.sql', 'CREATE TABLE users(...);', 'utf8');
        await db.query('Conexion de la base de datos exitoso');
    } catch (error) {
        console.log('Error al inicializar la base de datos ', error);
    } finally {
        await db.end();
    }
};

createTable();
module.exports = db;

// const { Pool } = require('pg')

// const db = new Pool({
//     host: "localhost",
//     user: 'postgres',
//     password: 'root',
//     database: 'user_info',
//     port: '5432'
// });

// module.exports = db;