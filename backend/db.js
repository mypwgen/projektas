let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'mydb1'
});

connection.connect ;{
    console.log("Connected!");
};

module.exports = connection;
