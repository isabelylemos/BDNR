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
    const database = client.db("space_db");
 
    // Selecionando a coleção "animais"
    const naves = database.collection("naves");

    await naves.insertMany([
        { nome: "Estrela Cadente", tipo: "exploração", capacidadeTripulantes: "2", emMissao: true },
        { nome: "Colossus", tipo: "carga", capacidadeTripulantes: "10", emMissao: true },
        { nome: "Serenity", tipo: "mineração", capacidadeTripulantes: "15", emMissao: true },
        { nome: "Galactica", tipo: "exploração", capacidadeTripulantes: "7", emMissao: false },
    ])

    const missaoTrue = await naves.find({ emMissao: true })
    console.log("Naves em missão: ", missaoTrue);

    const capaidadeMaxima = await naves.find({ capacidadeTripulantes: { $gt: 5 } })

    await naves.updateMany(
        { tipo: "carga" },  // Condição para encontrar naves de carga
        { $set: { emMissao: false } }  // Atualiza o campo "emMissao" para false
      );

    await naves.deleteMany({ capacidadeTripulantes: { $lt: 3 } }); 

    // Inserindo tripulantes relacionados a naves
    await tripulantes.insertMany([
    {
      nome: "Isabely",
      cargo: "Comandante",
      naveId: await naves.findOne({ nome: "Estrela Cadente" })._id
    },
    {
      nome: "Yasmin",
      cargo: "Engenheira",
      naveId: await naves.findOne({ nome: "Serenity" })._id
    },
    {
      nome: "Gustavo",
      cargo: "Piloto",
      naveId: await naves.findOne({ nome: "Colossus" })._id
    }
  ]);

    await tripulantes.find({ naveId: await naves.findOne({ nome: "Estrela Cadente" })._id });

} finally {
    await client.close();
  }
}