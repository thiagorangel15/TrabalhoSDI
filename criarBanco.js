let connection = require('./conexao')

const createDatabase = (req,res,form) => {
    form.parse(req, 
        (err, fields, files) => {
            let query = `CREATE DATABASE ${fields.nome}`
            connection.getConnection((err)=>{if(err) throw err})
            connection.query(query, (err) => {if (err) throw err})
            
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.write(`<p>Banco de dados ${fields.nome} criado com sucesso</p>`)
            res.write(`<p>Operação executada: ${query}</p>`)
            res.end(`<meta http-equiv="refresh" content="3;url=/">`)
    })
}

module.exports = createDatabase