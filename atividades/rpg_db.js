const { MongoClient } = require(mongodb)

// Função principal
async function main() {
  // Definir a URL de conexão com o MongoDB
  const uri = "mongodb://127.0.0.1:27017";
 
  //Criar uma instância do cliente mongodb
  const client = new MongoClient(uri);

  try {
    // Conect com o servidor MongoDB
    await client.connect();
 
    // Seleciona o banco de dados "rpg_db"
    const database = client.db("rpg_db");
 
    // Selecionando a coleção "personagens"
    const personagens = database.collection("personagens");

    // inserindo dados no banco
    await personagens.insertMany([
        { nome: "Arya Ventis", classe: "mago", nivel: 8, habilidades: ["soco de trovão", "invisibilidade"], vida: 20 },
        { nome: "Tony Stark", classe: "guerreiro", nivel: 15, habilidades: ["inteligencia", "força"], vida: 140 },
        { nome: "Wanda Maximoff", classe: "ilusionista", nivel: 18, habilidades: ["ilusão", "invisibilidade"], vida: 180 },
        { nome: "Natasha Romanoff", classe: "druidas", nivel: 10, habilidades: ["manipular elementos", "cura"], vida: 100 },
        { nome: "Peter Parker", classe: "metamorfo", nivel: 4, habilidades: ["mudança de forma", "visão noturna"], vida: 135 },
        { nome: "Steve Rogers", classe: "guerreiro", nivel: 3, habilidades: ["inspirar aliados", "força"], vida: 170 },
    ])

    // enconrando personagens com nivel maior que 10
    const personagensSuperior = await personagens.find({ nivel: {$gt: 10} }).toArray()
    console.log("Personagens com nível maior que 10: ", personagensSuperior)

    // escontrando personagens da classe geurreiros
    const guerreiros = await personagens.find({ classe: "guerreiro" }).toArray()
    console.log("Personagens da classe gierreiro: ", guerreiros)

    // atualizando a vida dos personagens para 200
    await personagens.updateMany(
        { $set: { vida: 200 } }
    )

    // deletando personagens com vida menor que 30
    await personagens.deleteMany({ vida: { $lt: 30 } });

  } finally {
    await client.close();
  }
}

// Chama a função principal e captura o erro, caso haja
main().catch(console.error);
