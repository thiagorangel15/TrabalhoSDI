let mysql = require('mysql')

let conexao = mysql.createPool(
    {
        connectionLimit: 20,
        host: 'localhost',
        user: 'root',
        password: ''
    }
)

module.exports = conexao