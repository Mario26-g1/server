
const db = require("../config/database")

const getAll = async (req, res) => {
    let client;
    try {
        client = await db.connect()
        const response = await db.query('SELECT * FROM users');
        console.log(response)
        return res.json(response.rows);
    } catch (error) {
        throw error
    } finally {
        if (client) {
            client.release()
        }
    }
};

const create = async (req, res) => {

    const { email, password, first_name, last_name, birthday } = req.body
    let client;
    try {
        client = await db.connect();
        const response = await db.query(
            'INSERT INTO users(email,password,first_name,last_name,birthday) VALUES($1,$2,$3,$4,$5)',
            [email, password, first_name, last_name, birthday])
        res.json({ email, password, first_name, last_name, birthday })
    } catch (error) {
        console.error('Error en la consulta', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    } finally {
        if (client) {
            client.release()
        }
    }
}

const getOne = async (req, res) => {
    let client;
    const { id } = req.params

    try {
        client = await db.connect();
        const response = await db.query('SELECT * FROM users WHERE id=$1', [id])
        if (!response.rows[0]) return res.status(404).json({ message: 'Usuario no encontrado' })
        return res.json(response.rows[0])
    } catch (error) {
        console.log('Erro al hacer la consulta', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    } finally {
        if (client) {
            client.release();
        }
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    let client;
    try {
        client = await db.connect();
        const response = await db.query('DELETE FROM users WHERE id=$1 RETURNING *', [id])
        if (!response.rows[0]) return res.status(404).json({ message: 'Usuario no encontrado' })
        return res.send(`User con Id=${id} eliminado`)

    } catch (error) {
        console.log('Error al hacer la consulta', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    } finally {
        if (client) {
            client.release();
        }
    }
}


const update = async (req, res) => {
    const { email, password, first_name, last_name, birthday } = req.body;
    const { id } = req.params;
    let client;
    try {

        client = await db.connect();
        const response = await db.query(
            'UPDATE users SET email=$1, password=$2, first_name=$3, last_name=$4, birthday=$5 WHERE id=$6 RETURNING *',
            [email, password, first_name, last_name, birthday, id]

        );

        if (response.rows.length === 0) return res.status(404).json({ message: 'User not Found' });
        return res.json(response.rows[0]);

    } catch (error) {
        console.error('Error en la consulta', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    } finally {
        if (client) {
            client.release();
        }
    }
};




module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}