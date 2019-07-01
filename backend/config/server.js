const port = 3003;

const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const allow = require('./cors');

server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());
server.use(allow);

server.listen(port, function(){
    console.log(`BACKEND executando na porta ${port}.`);
});

module.exports = server;