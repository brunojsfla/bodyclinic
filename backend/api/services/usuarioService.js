const Usuario = require('../entitys/usuario');
const _ = require('lodash');

Usuario.methods(['get', 'post', 'put', 'delete']);
Usuario.updateOptions({new : true, runValidators: true});

Usuario.after('post', sendError).after('put', sendError);

function sendError(req, res, next){
    const bundle = res.locals.bundle;

    if(bundle.errors){
        const errors = checkError(bundle.errors);
        res.status(500).json({errors});
    }else{
        next();
    }
};

function checkError(restFullError){
    const erros = [];
    _.forIn(restFullError, error => erros.push(error.message));

    return erros;
}

module.exports = Usuario;