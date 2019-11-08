const express = require('express');

module.exports = function(server){

    const openApi = express.Router();
    server.use('/oapibc', openApi);

    const AuthService = require('../api/services/authService');

    openApi.post('/login', AuthService.login);
    openApi.post('/validatetoken', AuthService.validateToken);
    
    const rt = express.Router();
    server.use('/apibc', rt);

    //Rota Estados
    const estadoService = require('../api/services/estadoService');
    estadoService.register(rt, '/estados');

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

    //Rota Suspensão de Escala
    const suspensaoEscalaService = require('../api/services/suspensaoEscalaService');
    suspensaoEscalaService.register(rt, '/suspensoes');

    //Rota Escala de Atendimento
    const escalaAtendimentoService = require('../api/services/escalaAtendimentoService');
    escalaAtendimentoService.register(rt, '/escalas');

     //Rota Medicamento
    const medicamentoService = require('../api/services/medicamentoService');
    medicamentoService.register(rt, '/medicamentos');

    //Rota Atendimento
    const atendimentoService = require('../api/services/atendimentoService');
    atendimentoService.register(rt, '/atendimentos');

    //Envio de e-mail
    const sendEmailService = require('../api/services/sendEmailService');
    server.post('/sendmail', sendEmailService);
};