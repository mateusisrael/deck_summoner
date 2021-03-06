import fs from 'fs/promises';
import path, { resolve } from 'path';
import mongoose, { mongo } from 'mongoose';
import { ChampModel } from '../Models';
import { rejects } from 'assert';

interface ChampsJson {
  type: string,
  format: string,
  version: string,
  data: any
}

(async () => {
  console.log("[Batch]");
  const champsOBJ = fs.readFile(path.join(__dirname, 'champs.json'), 'utf-8')
    .then(data => {
      data = JSON.parse(data)
      const keys = Object.keys(data);
      return data[keys[3]]
    })
    .catch(err => {throw new Error('Não foi possível ler o arquivo de dados!')});


  const champs = await champsOBJ;
  const champsKeys = Object.keys(champs);

  
  // console.log(champs[champsKeys[0]])


  // for(let i = 0; i< champsKeys.length; i++) {
  //   console.log(champs[champsKeys[i]])
  // }
  

  const dbConnection = mongoose.connect(
    'mongodb://127.0.0.1:17017/deck_summoner',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
  )
  .then(() => console.log("DB connected"))
  // .then(async () => {
  //   const champs = await ChampModel.find((err, champs) => {
  //     if(err) return err;
  //     return champs;
  //   })

  //   console.log(champs);

  // })
  .then(async () => {
    let batchs = 0;
    let errors = 0;

    for(let i = 0; i< champsKeys.length; i++) {
      const champ = champs[champsKeys[i]];
      await insert(champ);
    }

    console.log("Batch finalized");
  })
  .then(() => {
    return setTimeout(() => {
      mongoose.disconnect();
    }, 2000);
  })
  .catch((err: Error) => {throw new Error("Error connecting to the data base")});

})()

const insert = async (champ) => {
  const newChampion = new ChampModel({
    version: champ.version,
    id: champ.id,
    key: champ.key,
    name: champ.name,
    title: champ.title,
    blurb: champ.blurb,
    info: champ.info,
    image: champ.image,
    tags: champ.tag,
    partype: champ.partype,
    stats: champ.stats
  })
  newChampion.save((err: Error) => {
      if(err) return new Error("Batch error");
  });
}
