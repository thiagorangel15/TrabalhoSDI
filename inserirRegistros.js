const mysql = require('mysql')
let connection = require('./conexao')

const inserirRegistro = (req,res) => {
    let data = ''

    req.on('data', chunk => {
        data += chunk.toString()
    })

    req.on('end', () => {
        try{
            const dados = JSON.parse(data)
            
            const { nomeBanco, nomeTabela, valoresInputs } = dados
            const colunas = Object.keys(valoresInputs)
            const valores = colunas.map(coluna => valoresInputs[coluna])
            

            const query = `INSERT INTO ${nomeBanco}.${nomeTabela} (${colunas.join(', ')}) VALUES (${valores.map(valor => `'${valor}'`).join(', ')})`

            connection.getConnection((err)=>{if(err) throw err})
            connection.query(query, (err) => {
                if (err){
                    console.error('Erro ao inserir dados na tabela:', err)
                    res.writeHead(500, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify({error: 'Erro ao inserir dados na tabela'}))
                }})

                console.log('Dados inseridos com sucesso na tabela:', nomeTabela)
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({message: `${query}`})) 
        } catch(error){
            console.error('Erro ao processar solicitação', error)
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: 'Erro ao processar solicitação'}))
        }
    })
    
}

module.exports = inserirRegistro