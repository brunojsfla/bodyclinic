const express = require('express');

module.exports = function(server){
    const rt = express.Router();
    server.use('/apibc', rt);

    //Rota Endereços
    const enderecoService = require('../api/services/enderecoService');
    enderecoService.register(rt, '/enderecos');

    //Rota Municipios
    const municipioService = require('../api/services/municipioService');
    municipioService.register(rt, '/municipios');

    //Rota Ocupações
    const ocupacaoService = require('../api/services/ocupacaoService');
    ocupacaoService.register(rt, '/ocupacoes');

    //Rota Procedimentos
    const procedimentoService = require('../api/services/procedimentoService');
    procedimentoService.register(rt, '/procedimentos');
    
    //Rota Usuários
    const usuarioService = require('../api/services/usuarioService');
    usuarioService.register(rt, '/usuarios');

    //Rota Pacientes
    const pacienteService = require('../api/services/pacienteService');
    pacienteService.register(rt, '/pacientes');

    //Rota Profissionais
    const profissionalService = require('../api/services/profissionalService');
    profissionalService.register(rt, '/profissionais');

    //Rota Atendimento
};