const connection = require('./conexao')

const recuperarBancos = (res) => {
    connection.getConnection((err)=> { if(err) throw err})
    let consulta = 'SHOW DATABASES'
    connection.query(consulta,(err,results)=>{
        if (err) throw err
        const databases = results.map(result => result.Database)
        console.log(databases)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(databases))
    })
}

module.exports = recuperarBancos