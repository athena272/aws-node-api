// Esta função é responsável por analisar o corpo das requisições HTTP e transformá-lo em um objeto JSON.
function bodyParser(req, callback) {
    let body = ''

    // Evento 'data': Este evento é acionado quando há dados sendo transmitidos na requisição.
    req.on('data', (chunk) => {
        body += chunk
    })

    // Evento 'end': Este evento é acionado quando a transmissão de dados da requisição é concluída.
    req.on('end', () => {
        // O corpo do pedido é interpretado como JSON e armazenado na variável 'body'.
        body = JSON.parse(body)

        // O objeto JSON resultante é atribuído à propriedade 'body' do objeto de requisição (req).
        req.body = body

        // Chama a função de retorno (callback) fornecida para indicar que o parsing do corpo está concluído.
        callback()
    })
}

module.exports = { bodyParser }
