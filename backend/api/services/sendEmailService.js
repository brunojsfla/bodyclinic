const nodemailer = require('nodemailer');

const OTP_EMAIL_CONFIG = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'bodyclinichealth@gmail.com',
        pass: 'bl260816'
    }
};

let mailModule = nodemailer.createTransport(OTP_EMAIL_CONFIG);

module.exports = function sendEmailService(req, res, next){
    console.log('Enviando e-mail...');
    mailModule.verify(function(error, success){
        if(error)
            console.log('Falha no serviço SMTP');
        else{
            var mailOptions = {
                from: req.body.from,
                to: req.body.to,
                cc: req.body.cc,
                subject: req.body.subject,
                //text: req.body.text,
                html: req.body.html,
                attachments: req.body.attachments

            };
            mailModule.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log('e-mail não foi enviado!', error);
                    res.status(500).send({error});
                }else{
                    res.status(200).send('Sucesso no envio do e-mail!');
                    console.log('e-mail enviado com sucesso!');
                }
                res.end();
            });            
        }
    });
    //next();
};
