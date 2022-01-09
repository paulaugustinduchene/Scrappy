const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const baseurl = 'https://www.lemondeinformatique.fr'
const url = baseurl + '/actualites/toute-l-actualite.html'

const header =  {
    headers:
    {      
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0" ,
    },
}

function formatMonthfrench(month) {
    let mois = 'null'
    switch(month + 1){
        case 1 :
            mois = "Janvier";
            break
        case 2 :
            mois = "Fevrier";
            break
        case 3 :
            mois = "Mars";
            break
        case 4 :
            mois ="Avril";
            break
        case 5 :
            mois = "Mai";
            break
        case 6 :
            mois = "Juin";
            break
        case 7 :
            mois = "Juillet";
            break
        case 8 :
            mois ="Aout";
            break
        case 9 :
            mois = "Septembre";
            break
        case 10 :
            mois = "Octobre";
            break
        case 11 :
            mois = "Novembre";
            break
        case 12 :
            mois = "Decembre";
            break
        default:
            console.log("Error month is : " + month);                              
    }

    return mois;
}

async function scrap() {
    console.log("enter scrap LMI")
    const tout = []
    await axios(url, header ).then(response => {
        const html = response.data
        const $ = cheerio.load(html)
    
        const now = new Date()
        
        const today = now.getDate() + " " + formatMonthfrench(now.getMonth()) + " " + now.getFullYear()
    
        $('.list-large').find('.item').each((idx, row) => {
            const article = {
                title : $(row).find('h2').text().trim(),
                urlredirect: baseurl + $(row).find('a').attr('href'),
                date : $(row).find('b').text().trim()
            }

            if(article.date.includes(today.toString())){           
                tout.push(article)
            }
        });
    }).catch(err => console.log(err))
    
    return tout;
}

module.exports = scrap