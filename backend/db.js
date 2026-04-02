let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'mydb1'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection;