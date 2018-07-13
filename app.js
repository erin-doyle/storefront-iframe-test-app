const express = require("express");
const app = express();

app.use(express.static(__dirname + '/static'));

app.get('/',function(req,res){
    res.sendFile('index.html');
});

app.listen(3030);

console.log("Running at Port 3030");
