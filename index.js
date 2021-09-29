const express = require('express');
const puppeteer = require('puppeteer');
const moment = require('moment');
const { text } = require('express');
require('dotenv').config()

var path2 = moment().format('Do-MM--hh-mm')
const app = express()
app.get('/', async(req, res)  =>{



    var number = Math.random() * (1000 - 1) + 1

    const browser = await puppeteer.launch({
        headless : false,
    });
    const page = await browser.newPage();
    await page.goto('https://cuidandojuntos.duratex.com.br/dashboard');
  
    await page.type('#email', process.env.EMAIL)
    await page.type('#password',  process.env.PASSWORD)
    await page.click('.login-btn')
  setTimeout( async function(){
      await page.evaluate(() => console.log(`'Não' foi marcado`));
      await page.click('.radio-list-item-nao')[0]
      setTimeout( async function(){
        await page.evaluate(() => console.log(`Requeste enviada`));
        // await page.evaluate(() => console.log(number));
        
        await page.click('.register-btn')[0]
        setTimeout(async() => {
        await page.screenshot({ path: path2 + '.png' });

            await browser.close(); 
            }, 1000);
           
            
          }, 1000)
    
      }, 4000)
        var filepath = '/' + path2 +'.png'
     setTimeout(async() =>{
        res.sendFile(__dirname + filepath)
     }, 10000)

       
        
   

        
 
    
} )

var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log('Escutando na porta', port);
});