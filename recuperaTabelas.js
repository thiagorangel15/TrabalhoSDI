const mysql = require('mysql')
const formidable = require('formidable')

let dbConfig = {
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
}

function conectarDB(database) {
    dbConfig.database = database
    const connection = mysql.createPool(dbConfig)
    connection.getConnection((err) => {if (err) throw err})
    return connection
}

const recuperarTabelas = (req,res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err,fields) => {
        if (err) throw err
        let nomeBanco = fields.banco[0]
        let connection = conectarDB(nomeBanco)
        let query = 'SHOW TABLES'
        connection.query(query, (err,results) => {
            if(err) throw err
            //console.log(results)
            const nomePropriedade = Object.keys(results[0])[0]
            const tables = results.map(result => result[nomePropriedade])
            console.log(tables)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(tables))

        })

    })
    
}

module.exports = recuperarTabelas







