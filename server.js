const express = require('express');
const db = require('./db');
var bodyParser = require('body-parser');
const routes = require('./routes');
const app=express();
db.connect();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', routes);




app.get('/', (req, res) => res.send("Welcome to Node Postgres Express POC !!"))

app.get('/causes', (req, res, next) => db.getCauses((causes, err) => {
	if(causes){
		return next(causes);
	};
}));





const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('listening on port '+ port));