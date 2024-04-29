let mysql = require('mysql')

let conexao = mysql.createPool(
    {
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: ''
    }
)

module.exports = conexao