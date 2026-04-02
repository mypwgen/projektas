const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');


app.use(express.json());
app.use(cors());


app.listen(5000, () => {
    console.log('Serveris veikia port 5000');
});