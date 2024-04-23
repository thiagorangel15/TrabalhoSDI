let connection = require('./conexao')

const criarTabela = (req, res, form) => {
    form.parse(req,
        (err, fields, files) => {
            if (err) throw err
            const nomeTabela = fields.nomeTabela[0]
            const banco = fields.banco[0]
            let colunas = []
            let i = 1
            connection.getConnection((err)=>{if(err) throw err})
            while(fields[`nomeColuna${i}`]){
                const nomeColuna = fields[`nomeColuna${i}`]
                const tipoColuna = fields[`tipoColuna${i}`]
                const tamanhoColuna = fields[`tamanhoColuna${i}`]
                colunas.push(`${nomeColuna} ${tipoColuna} (${tamanhoColuna})`)
                i++
            }
            const query = `CREATE TABLE ${banco}.${nomeTabela} (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ${colunas.join(", ")})`
            connection.query(query, (err) => { if(err) throw err})
                
            
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.write(`<p>Tabela ${nomeTabela} criado com sucesso</p>`)
            res.write(`<p>Operação executada: ${query}</p>`)
            res.end(`<meta http-equiv="refresh" content="3;url=/">`)
        }
   
    )

}

module.exports = criarTabela