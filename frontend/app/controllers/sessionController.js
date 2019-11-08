(function(){
    app.controller('SessionController', ['$http', 'urls', 'msgs', 'authFactory', '$location', function($http, urls, msgs, authFactory, $location){
        
        const self = this;
                        
        self.login = function(){
            authFactory.login(self.user, err => err ? msgs.msgError(err) : msgs.msgSuccess('Sucesso Login!'));
        };

        self.logout = function(){
            authFactory.logout(() => msgs.msgSuccess('Sucesso Logout!'));
        };

        self.user = function(){
            authFactory.getUser();
        };

    }]);

})()