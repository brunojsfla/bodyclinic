(function(){
    app.controller('SessionController', ['$http', 'urls', 'msgs', 'tabsFactory', 'bcUtils', function($http, urls, msgs, tabsFactory, bcUtils){
        
        const self = this;
        self.user = self.user = {nome: 'Bruno', email: 'brunojsfla@gmail.com', perfil: 'PROFISSIONAL'};
        
        self.login = function(){
            msgs.msgSuccess('Sucesso no login!');
        };

        self.logout = function(){
            alert('Sair da APP');
        };

    }]);

})()