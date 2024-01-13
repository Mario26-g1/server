const createTable = async () => {
    let client;
    try {
        client = await db.connect();


        const result = await client.query('SELECT to_regclass(\'users\')');


        if (!result.rows[0].to_regclass) {
            await client.query(`
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

        if (client) {
            client.release();
        }

    }
};

createTable();

module.exports = db;
