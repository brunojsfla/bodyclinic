(function(){
    app.controller('SessionController', ['$http', 'urls', 'msgs', 'authFactory', '$location', function($http, urls, msgs, authFactory, $location){
        
        const self = this;
                        
        self.login = function(){
            authFactory.login(self.user, err => err ? msgs.msgError(err) : msgs.msgSuccess('Sucesso!'));
        };

        self.logout = function(){
            alert('Sair da APP');
        };

    }]);

})()