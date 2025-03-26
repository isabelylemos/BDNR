// Importar o modulo MongoClient
const { MongoClient } = require("mongodb");
 
// Função principal
async function main() {
  // Definir a URL de conexão com o MongoDB
  const uri = "mongodb://127.0.0.1:27017";
 
  //Criar uma instância do cliente mongodb
  const client = new MongoClient(uri);

  try {
    // Conect com o servidor MongoDB
    await client.connect();
 
    // Seleciona o banco de dados "zoo_db"
    const database = client.db("zoo_db");
 
    // Selecionando a coleção "animais"
    const livros = database.collection("animais");

    //Inserindo dados do banco
    await livros.insertMany([
      { nome: "Thor", especie: "Tigre-de-bengala", idade:7, dieta: "Carnívoro", habitat: "Floresta Tropical", vacinado: false },
      { nome: "Luna", especie: "Arara-azul", idade:4, dieta: "Herbívoro", habitat: "Deserto", vacinado: false },
      { nome: "George", especie: "Macaco-dourado", idade:10, dieta: "Onívoro", habitat: "Floresta Tropical", vacinado: false },
      { nome: "Matteo", especie: "Camelo-dromedario", idade:16, dieta: "Herbívoro", habitat: "Deserto", vacinado: false },
      { nome: "Jasmine", especie: "Jibóia", idade:18, dieta: "Carnívoro", habitat: "Floresta Tropical", vacinado: false },
      
    ]);
 
    //consultar todos os documentos
    const todosHerbivoros = await animais.find({ dieta: "Herbívoro" });
    console.log("Animais Herbívoros: ", todosHerbivoros);

    const vivemDeserto = await animais.find({habitat: "Deserto" })
    console.log("Animais que vivem no deserto: ", vivemDeserto);
 
    //atualizar um documento
    await animais.updataMany(
        { especie: { $in: ["Tigre-de-bengala", "Leão"] } },
        { $set: { vacinado: true } }
    );
 
    // excluir um documento
    await animais.deleteMany({ idade: { $gt: 15 } })

} finally {
    await client.close();
  }
}