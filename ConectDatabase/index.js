const bd = require('pg');

const url = "postgres://professor:professor@database-rosario.cdwc6p3jwzmp.us-east-1.rds.amazonaws.com/hotel_management"

const client = new bd.Client(url);

function insertCategory(category) {
    client.connect();
    const query = client.query(`INSERT INTO hotel_management.categorias (nome, descricao) VALUES ('${category.nome}','${category.descricao}')`);
    query.then((response) => {
        console.log("Category inserted: " + response);
        client.end();
    }).catch((error) => {
        console.error("Error inserting category: " + error);
        client.end();
    });
}

function selectCategory(id) {
    client.connect();
    const query = client.query(`SELECT id_categoria, nome, descricao FROM hotel_management.categorias WHERE id_categoria=${id}`);
    query.then((response) => {
        console.log("Selected category: " + JSON.stringify(response.rows));
        client.end();
    }).catch((error) => {
        console.error("Error selecting category: " + error);
        client.end();
    });
}

// Exemplo de inserção de categoria
// const novaCategoria = {
//     nome: "Aventura Radical",
//     descricao: "Hotéis para os aventureiros de coração que buscam experiências radicais."
// };
// insertCategory(novaCategoria);

// Exemplo de seleção de categoria pelo ID
const categoriaId = 3; // Substitua pelo ID da categoria desejada
selectCategory(categoriaId);
