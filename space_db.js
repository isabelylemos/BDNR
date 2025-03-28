// Importar o modulo MongoClient
const { MongoClient } = require("mongodb");
 
// Função principal
async function main() {
  // Definir a URL de conexão com o MongoDB
  const uri = "mongodb://127.0.0.1:27017";
 
  //Criar uma instância do cliente mongodb
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("space_db");
    const naves = database.collection("naves");

    // Inserindo dados do banco com capacidadeTripulantes como número
    const navesInserir = await naves.insertMany([
        { nome: "Estrela Cadente", tipo: "exploração", capacidadeTripulantes: 2, emMissao: true },
        { nome: "Colossus", tipo: "carga", capacidadeTripulantes: 10, emMissao: true },
        { nome: "Serenity", tipo: "mineração", capacidadeTripulantes: 15, emMissao: true },
        { nome: "Galactica", tipo: "exploração", capacidadeTripulantes: 7, emMissao: false },
    ]);

    // Pegando os IDs 
    const idsNaves = Object.values(navesInserir.insertedIds);

    // Encontrando naves que estão em missão
    const missaoTrue = await naves.find({ emMissao: true }).toArray();
    console.log("Naves em missão: ", missaoTrue);

    // Encontrando naves que têm capacidade maior que 5 tripulantes
    const capacidadeMaxima = await naves.find({ capacidadeTripulantes: { $gt: 5 } }).toArray();
    console.log("Naves com capacidade de tripulantes maior que 5: ", capacidadeMaxima);

    // Desativando naves de carga mudando o status de emMissao para false
    await naves.updateMany({ tipo: "carga" }, { $set: { emMissao: false } });
    console.log("Naves de carga foram desativadas temporariamente!");

    // Deletando naves com capacidade menor que 3
    await naves.deleteMany({ capacidadeTripulantes: { $lt: 3 } });
    console.log("Naves com capacidade menor que 3 para tripulantes foram consideradas obsoletas.");

    // Criando nova coleção tripulantes e relacionando com as naves
    const tripulantes = database.collection("tripulantes");
    await tripulantes.insertMany([
      { nome: "Isabely Lemos", id_nave: idsNaves[0] },
      { nome: "Yasmin Pires", id_nave: idsNaves[1] },
      { nome: "Ana Flavia", id_nave: idsNaves[2] },
    ]);

    console.log("Tripulantes inseridos com sucesso!");

  } finally {
     // Fechar a conexão
    await client.close();
  }
}

// Chama a função principal e captura erros
main().catch(console.error);
