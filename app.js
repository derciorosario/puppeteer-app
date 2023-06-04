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

let chrome={}
let puppeteer;


if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
    puppeteer = require('puppeteer-core');
    chrome = require('chrome-aws-lambda');
}else{
    puppeteer = require('puppeteer');
}


app.set('port',process.env.PORT || 3000) 


//app.get('/api',async (req,res)=>{
        let options={}

        if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
            options={
                args:[...chrome.args,'--no-sandbox', '--disable-setuid-sandbox','--hide-scrollbars','--disable-web-security'],
                executablePath:await chrome.executablePath,
                defaultViewport:chrome.defaultViewport,
                headless:true,
                ignoreHTTPSErrors:true
            }
        }else{
            options={
                executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Replace with the actual path to Chrome
            }
        }

        try{
            
            const browser = await puppeteer.launch(options);
            const page = await browser.newPage();
          
            const url = "https://google.com";
            await page.goto(url);
            await page.setViewport({width: 1080, height: 1024});
            
            res.send({title:await page.title()})
            console.log('success')
            await browser.close()

        }catch(e){
            console.log('We have an error:',error)
        }
    

       
//})


app.listen(app.get('port'),()=>{
    console.log('server is running')
})




