const { response} = require('express')
const express = require('express')
const app = express()
const https = require('https')
const bodyparser = require('body-parser')
const PORT=5000;

app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/index.html");
})
app.post('/',(req,res)=>{


    const query = req.body.cityName;
    const apikey=c7b0baaf220c69fd7021fad1da488341
    const url = `https://api.openweathermap.org/data/2.5/weather?q=`+ query +`&appid=`+apikey+
    https.get(url,(response) =>{
         response.on('data',(data)=>{

        const weatherData= JSON.parse(data);
        const temp = weatherData.main.temp;
        const discription =  weatherData.weather[0].description;
    
         res.write("<h1>The temperature of city is "+ query+"degree celcius"+temp+"</h1>");
         res.write("<p>The weather discription is "+ discription+"</p>");

    })
    

    })



});



app.listen(PORT,(req,res)=>{
    console.log("server is listening ${PORT}")
})