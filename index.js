let http = require('http')
let url = require('url')
let fs = require('fs')
let formidable = require('formidable')
let criarBanco = require('./criarBanco')
const recuperaBancos = require('./recuperaBancos')
const criarTabela = require('./criarTabela')
const recuperaTabelas = require('./recuperaTabelas')




function sendPage (filePath, res){
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Erro interno do servidor');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
}

// Crie o servidor HTTP
const server = http.createServer((req, res) => {
    
    // Roteamento de páginas
    if (req.url === '/' || req.url === '/index.html') {
        sendPage('./index.html', res);
    } else if (req.url === '/criar-banco-de-dados') {
        sendPage('./criar_banco_de_dados.html', res);

    } else if (req.url === '/criar-tabela') {
        sendPage('./criar_tabela.html', res);
    } else if (req.url === '/inserir-registros') {
        sendPage('./inserir_registros.html', res);
    } else if (req.url === '/listar-registros') {
        sendPage('./listar_registros.html', res);
    } else if (req.url === '/criar-banco-de-dados/banco'){
        let form = new formidable.IncomingForm()
        criarBanco(req,res,form)
        
    } else if (req.url === '/criar-tabela/tabela-criada'){
        let form = new formidable.IncomingForm()
        criarTabela(req,res,form)
    } else if (req.url === '/recuperar-bancos'){
        recuperaBancos(res)    
    } else if(req.url === '/recuperar-tabelas'){
        recuperaTabelas(req,res)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Página não encontrada');
    }
});

// Escuta na porta 3000
server.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
});

