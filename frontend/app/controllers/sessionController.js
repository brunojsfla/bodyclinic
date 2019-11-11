(function(){
    app.controller('SessionController', ['$http', 'urls', 'msgs', 'authFactory', '$location', '$rootScope', function($http, urls, msgs, authFactory, $location, $rootScope){
        
        const self = this;
                        
        self.login = function(){
            authFactory.login(self.user, err => err ? msgs.msgSuccess(err) : console.log('Usuário logado: ', $rootScope.usuarioLogado));
        };

        self.logout = function(){
            authFactory.logout(() => msgs.msgSuccess('Sucesso Logout!'));
        };

        //self.user = {nome: 'Bruno', email: 'brunojsfla@gmail.com', perfil: 'ADMINISTRADOR'};

    }]);

})()