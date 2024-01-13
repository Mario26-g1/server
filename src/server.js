const express = require('express');

const app = express();
const cors = require('cors');
const router = require('./router');
require('dotenv').config();


const PORT = process.env.PORT || 4000

app.use(cors())

//MIDDELWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/api/v1/', router)
app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(PORT)
console.log(`Server running in port ${PORT}`)
