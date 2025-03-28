// Importar o modulo MongoClient
const { MongoClient } = require("mongodb");

// Função principal
async function main() {
  // Definir a URL de conexão com o MongoDB
  const uri = "mongodb://127.0.0.1:27017";

  // Criar uma instância do cliente MongoDB
  const client = new MongoClient(uri);

  try {
    // Conectar ao servidor MongoDB
    await client.connect();

    // Seleciona o banco de dados "zoo_db"
    const database = client.db("zoo_db");

    // Selecionando a coleção "animais"
    const animais = database.collection("animais");

    // Inserindo dados na coleção
    await animais.insertMany([
      { nome: "Thor", especie: "Tigre-de-bengala", idade: 7, dieta: "Carnívoro", habitat: "Floresta Tropical", vacinado: false },
      { nome: "Luna", especie: "Arara-azul", idade: 4, dieta: "Herbívoro", habitat: "Deserto", vacinado: false },
      { nome: "George", especie: "Macaco-dourado", idade: 10, dieta: "Onívoro", habitat: "Floresta Tropical", vacinado: false },
      { nome: "Matteo", especie: "Camelo-dromedário", idade: 16, dieta: "Herbívoro", habitat: "Deserto", vacinado: false },
      { nome: "Jasmine", especie: "Jibóia", idade: 18, dieta: "Carnívoro", habitat: "Floresta Tropical", vacinado: false },
    ]);

    // Consultar animais herbívoros
    const todosHerbivoros = await animais.find({ dieta: "Herbívoro" }).toArray();
    console.log("Animais Herbívoros:", todosHerbivoros);

    // Consultar animais que vivem no deserto
    const vivemDeserto = await animais.find({ habitat: "Deserto" }).toArray();
    console.log("Animais que vivem no deserto:", vivemDeserto);

    // Atualizar os felinos como vacinados
    await animais.updateMany(
      { especie: { $in: ["Tigre-de-bengala", "Leão"] } },
      { $set: { vacinado: true } }
    );

    console.log("Felinos foram vacinados!");

    // Excluir animais com idade maior que 15 anos
    await animais.deleteMany({ idade: { $gt: 15 } });
    console.log("Animais com idade maior que 15 anos foram removidos.");

  } finally {
    // Fechar a conexão
    await client.close();
  }
}

// Chama a função principal e captura erros
main().catch(console.error);
