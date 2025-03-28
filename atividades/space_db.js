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
 
    // Seleciona o banco de dados "space_db"
    const database = client.db("space_db");
 
    // Selecionando a coleção "naves"
    const naves = database.collection("naves");

    //Inserindo dados do banco
    await naves.insertMany([
        { nome: "Estrela Cadente", tipo: "exploração", capacidadeTripulantes: "2", emMissao: true },
        { nome: "Colossus", tipo: "carga", capacidadeTripulantes: "10", emMissao: true },
        { nome: "Serenity", tipo: "mineração", capacidadeTripulantes: "15", emMissao: true },
        { nome: "Galactica", tipo: "exploração", capacidadeTripulantes: "7", emMissao: false },
    ])

    // encontrando naves que estão em missão
    const missaoTrue = await naves.find({ emMissao: true }).toArray()
    console.log("Naves em missão: ", missaoTrue);

    //encontrando naves que tem capacidade maior que 5
    const capaidadeMaxima = await naves.find({ capacidadeTripulantes: { $gt: 5 } }).toArray()

    // escontrando naves de carga que não estão em missão
    await naves.updateMany(
        { tipo: "carga" },  
        { $set: { emMissao: false } } 
      );

    // deletando naves com capacidade menor que 3
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

// Chama a função principal e captura o erro, caso haja
main().catch(console.error);