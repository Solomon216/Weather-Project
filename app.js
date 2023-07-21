const bodyPAresr = require('body-parser');
const exprees = require('express');
const app = exprees();
const https = require('https');
app.use(bodyPAresr.urlencoded({ extended: true }));
app.use(exprees.static("public"));

app.set('view engine', 'ejs');

app.get('/', (req, res) => { 
    res.render('index');
})

app.post('/weather', function (req, res) {
    const city = req.body.city;
    const key='b4b7573e1e86180eee2eb4e275bde52e'
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +'&appid='+ key +"&units=metrics"
    https.get(url, (response) => { 
        console.log(response);
        response.on('data',function (data) {
            const wdata = JSON.parse(data);
            const tempw = wdata.main.temp;
            const data1 =Math.round( tempw - 273.15 );
            const desc = wdata.weather[0].description;
            const icon = wdata.weather[0].icon
            const umgurl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
            res.render('result', { tempw:data1, desc: desc, umgurl: umgurl });
        })
    });
})



app.listen(3000, () => { 
    console.log('Server is running on port 3000');
})