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

const recuperarRegistros = (req,res) => {
    let data = ''

    req.on('data', chunk => {
        data += chunk.toString()
    })

    req.on('end', () => {
        const body = JSON.parse(data)
        const nomeBanco = body.banco
        const nomeTabela = body.tabela

        let connection = conectarDB(nomeBanco)
        let query = `SELECT * FROM  ${nomeTabela}`
        connection.query(query, (err,results) =>{
            if(err) throw err
        function colunasEregistros(resultado){
            if(resultado.length === 0){
                return {colunas: [], registros: []}
            }
            const colunas = Object.keys(results[0])
            const registros = results.map(row => {
                const registro = {}
                colunas.forEach(coluna=>{
                    registro[coluna]= row[coluna]
                })
                return registro
            })
            return {colunas, registros}

        }
            const { colunas , registros} = colunasEregistros(results)
            const responseData = JSON.stringify({colunas, registros})
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(responseData)
            
        })
    })
    
}

module.exports = recuperarRegistros