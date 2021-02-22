express = require('express')
const cors = require('cors')
var app = express();
var compression = require('compression')
const MongoClient = require('mongodb').MongoClient;
var logger = require("./node/loggerConfig")
const dbConnection = require("./node/dbConnection")
const path = require('path');

let port = 8081;

app.listen(process.env.PORT || port, () => {
    console.log(`Express server started at port number : ${port}`)
});

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + "/dist/cormentis/index.html"));
// });

app.use(compression())

var corsOptions = {
    "origin": '*',
    "Access-Control-Allow-Origin": '*',
}

app.use(express.static(__dirname + '/dist/insurancekarma/'));

app.use(express.json());
app.use('*', cors())


app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname + "/dist/insurancekarma/index.html"));
});

app.get('/getMasterData', function (req, res) {
    console.log("getMasterData called...")
    try {
        dbConnection.getInsuraceMasterData().then((data) => {
            console.log('Sending response as : ' + JSON.stringify(data))
            res.send(data);
            res.end();
        }).catch((error) => {
            console.log(`Error ocurrued while getting data from the database as ` + error)
        });
    } catch (error) {
        console.log('Error occured while calling getMasterData api')
    }
});


app.post('/getPremium',function(req, res){
    console.log("getPremium called with data " + JSON.stringify(req.body));
    try {
        dbConnection.calculatePremium(req.body).then((data)=>{
            res.send(data);
            res.end();
        })
    } catch (error) {
        console.log('Error in getPremium as : ' + error)
    }    
});
