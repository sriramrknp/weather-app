const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const city = req.body.cityName;
  const appKey = "2e440394d9b6620394fd9213610ffbe5";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appKey + "&units=metric";

  https.get(url, function(responce){
    responce.on("data", function(data){
      var weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      res.write("The temperature at " + city + " is " + temp);
      res.send();
    });
  });

});

app.listen(3000, function(){
  console.log("server started on port 3000");
});
