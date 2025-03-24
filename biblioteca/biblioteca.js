// importar o modulo MongoClient
const {MongoClient} = require('mongodb');

// Função principal
async function main() {
    // definir a URI de conexão com o MongoDB
    const uri = "mongodb://127.0.0.1:27017";
    // criar instancia do cliente mongoDB
    const client = new MongoClient(uri);
    try {
        // conecta com o servidor MongoDB
        await client.connect();
        // seleciona o banco "biblioteca-aula"
        const database = client.db('biblioteca-aula');
        // seleciona a coleção "livros"
        const livros = database.collection('livros');
/*
        // inserir informações 
        await livros.insertMany([
            {titulo:"1984", autor: "George Orwell", ano: 1949, genero: "Distopia"},
            {titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, genero: "Romance"},
            {titulo: "Senhor dos Anéis", autor:"J.R.R Tolkei", ano: 1954, genero: "Fantasia"}
        ])
*/
/*
        // consultar todos os documentos
        const todosLivros = await livros.find().toArray();
        console.log('Livros:', todosLivros);
*/
/*
        // atualizar um documento
        await livros.updateOne(
            {titulo:"1984"}, // filtro p encontrar registro
            {$set: {ano:1950}} // valor atualizado
        )
*/

        // excluir documento
        await livros.deleteOne({titulo: "Dom Casmurro"})

    } finally {
        await client.close();
    }
}


// chama função principal e captura o erro, se houver
main().catch(console.error);