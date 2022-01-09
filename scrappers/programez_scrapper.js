const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const baseurl = 'https://www.programmez.com'
const url = baseurl + '/actus_print.php'

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
    console.log("enter scrap programmez")
    const todayNewsOnProgrammez = []
    await axios(url, header ).then(response => {
        const html = response.data
        const $ = cheerio.load(html)
    
        const now = new Date()
        
        const today = now.getDate()   + " " + formatMonthfrench(now.getMonth()) + " " + now.getFullYear()
        
        $('.view-actualites').find('.views-row').each((idx, row) => {
            const article = {
                title : $(row).find('.views-field-title').text().trim(),
                urlredirect: baseurl + $(row).find('a').attr('href'),
                date : $(row).find('.views-field-created').text().trim()
            }
    
            if((now.getDate() < 10 &&  article.date  === "0" + today.toString()) || article.date  === today.toString() ){           
                todayNewsOnProgrammez.push(article)
            }
        });
    
    }).catch(err => console.log(err))
    
    return todayNewsOnProgrammez;
}

module.exports = scrap