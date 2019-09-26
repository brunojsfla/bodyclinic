const port = 3005;

const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const cors = require('cors');
const moment = require('moment-timezone');

server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());
server.use(cors());
//moment().utcOffset('-03:00', true);
moment.tz.setDefault('America/Sao_Paulo');

server.listen(port, function(){
    console.log(`BACKEND executando na porta ${port}.`);
});

module.exports = server;