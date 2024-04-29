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

const recuperarColunas = (req,res) => {
    let data = ''

    req.on('data', chunk => {
        data += chunk.toString()
    })

    req.on('end', () => {
        const body = JSON.parse(data)
        const nomeBanco = body.banco
        const nomeTabela = body.tabela

        let connection = conectarDB(nomeBanco)
        let query = `DESCRIBE ${nomeTabela}`
        connection.query(query, (err,results) =>{
            if(err) throw err
            
            const campos = results.filter(row => row.Extra !== 'auto_increment').map(row => {
                return {nomeColuna: row.Field, tipoColuna: row.Type}
            })

            

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(campos))
        })
    })
    
}

module.exports = recuperarColunas