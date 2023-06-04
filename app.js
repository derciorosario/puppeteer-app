/*const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://example.com"

axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
    
        $("a").each((index, element) => {
            console.log($(element).attr("href"));
        });

        const title = $("title").text();
        console.log("Title:", title);

    })
    .catch(error => {
       console.log(error)
});*/

const { error } = require('console');





const app=require('express')()

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}


app.set('port',process.env.PORT || 3000) 


app.get('/',async (req,res)=>{
        let options={}

      if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        options = {
          args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
          defaultViewport: chrome.defaultViewport,
          executablePath: await chrome.executablePath,
          headless: true,
          ignoreHTTPSErrors: true,
        };
      } else{
            options={
                executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Replace with the actual path to Chrome
            }
      }

       
    try{        
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    const url = "https://google.com";
    await page.goto(url);
    res.send({title:await page.title()})
    }catch(e){
        console.log('we have a error',e)
    }
    
    
})


app.listen(app.get('port'))




