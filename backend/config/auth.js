const jwt = require('jsonwebtoken');
const secret = 'body@clinic@';

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    next();
  } else {
        const token = req.body.token || req.query.token || req.headers['authorization'];
        if(!token) {
            return res.status(403).send({errors: ['Nenhum token providenciado.']});
        }
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                return res.status(403).send({errors: ['Falha ao autenticar o token.']});
            } else {
                next();
            }
        });
    }
};