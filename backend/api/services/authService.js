const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuario = require('../entitys/usuario');
const env = require('../../.env');

const sendErrorsFromDB = (res, dbErrors) =>{
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));

    return res.status(400).json({errors});
};

const login = (req, res, next) => {
    const email = req.body.email || '';
    const senha = req.body.senha || '';
  
    usuario.findOne({email}, (err, user) => {
        if(err){
            return sendErrorsFromDB(res, err);
        }else 
            if(user){
                if(user.senha === senha){
                    const token = jwt.sign(user, env.authSecret, {
                        expiresIn: '1 day'
                    });
                    
                    const { nome, email, perfil } = user;
                    res.json({ nome, email, perfil, token });
                }else{
                    return res.status(400).send({errors: ['Usuário ou senha invalidos!']});
                }
            }else{
                return res.status(400).send({errors: ['Usuário não existe na base de dados!']});
            }
            
    });
 };

 const validateToken = (req, res, next) => {
    const token = req.body.token || '';
    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({valid: !err});
    });
};

module.exports = { login, validateToken };