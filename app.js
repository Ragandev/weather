const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { response } = require("express");

const app = express();

app.use(http);
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/page.html");
});

app.post("/", function(req, res){
    var cityName = req.body.city;
    var userUnit = req.body.unit;

    var apiKey = "a981b9987dd26957edeccddf5a25df3e";
    var url = "http://api.weatherstack.com/current?access_key="+apiKey+"&query="+cityName+"&units="+ userUnit;

    http.get(url, function(response){
        
        response.on("data", function(data){
            var weather = JSON.parse(data);

            var temp =  weather.current.temperature;
            var dis = weather.current.weather_descriptions[0];

        res.write("<h1>"+ cityName +"</h1>");
        res.write("<h3>Temperature is "+ temp +"</h3>");
        res.write("<h3>Weather is "+ dis +"</h3>");
        res.send();

        });

        

    });

    // console.log(cityName);
    // console.log(userUnit);
});
// app.listen("Ragandev.github.io/weather");
app.listen(process.evn.PORT);
console.log("Server Started");
