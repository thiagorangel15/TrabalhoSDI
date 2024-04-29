const mysql = require('mysql')


let dbConfig = {
    connectionLimit: 100,
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
    let data = ''
    
    req.on('data', chunk => {
        data += chunk.toString()
    })

    req.on('end', () => {
        const body = JSON.parse(data)
        const nomeBanco = body.banco
        let connection = conectarDB(nomeBanco)
        
        let query = 'SHOW TABLES'
        connection.query(query, (err,results) =>{
            if(err) throw err
            const nomePropriedade = Object.keys(results[0])[0]
            const tables = results.map(result => result[nomePropriedade])
            

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(tables))
        })
        
    })
    
}

module.exports = recuperarTabelas








