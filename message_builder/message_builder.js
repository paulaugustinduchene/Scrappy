const scrapProg = require('../scrappers/programez_scrapper');
const scrapLMI = require('../scrappers/LMI_scrapper');
const  sendMessage = require('../Authorization');
const fs = require('fs');

const content = "Voici les actuallités du moment, que scrappy a deniché pour toi ! :\n"


async function scrap(){

  fs.writeFile('./filename.txt', content, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log("File initialized ...")
  })

  await scrapProg().then((res) => {
    res.forEach(article => {
      const raw = "- " + article.title + " " + article.urlredirect + "\n"
      fs.appendFile('./filename.txt', raw ,err => {
        if (err) {
          console.error(err)
          return
        }
      })
    })

  }).catch(err => console.log(err))

  await scrapLMI().then((res) => {
    res.forEach(article => {
      const raw = "- " + article.title + " " + article.urlredirect + "\n";
      fs.appendFile('./filename.txt', raw ,err => {
        if (err) {
          console.error(err)
          return
        }
      })
    })
    
  }).catch(err => console.log(err))

  fs.appendFile('./filename.txt', "A Bientot ! 🐭", err => {
    if (err) {
      console.error(err)
      return
    }
    console.log("File terminated ...")
  })

  sendMessage()
}

module.exports =  scrap
