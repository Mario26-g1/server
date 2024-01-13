const express = require('express');
const router = require('./src/router/index');
const app = express();
const cors = require('cors')
require('dotenv').config();


const PORT = process.env.PORT || 4000

app.use(cors())

//MIDDELWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/api/v1/', require('./src/router/index'))
app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(PORT)
console.log(`Server running in port ${PORT}`)
