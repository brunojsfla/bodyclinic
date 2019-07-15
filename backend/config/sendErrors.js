const _ = require('lodash');

module.exports = function sendError(req, res, next){
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