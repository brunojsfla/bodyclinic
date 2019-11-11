(function(){
    app.controller('SessionController', ['$window', 'urls', 'msgs', 'authFactory', '$location', '$rootScope', function($window, urls, msgs, authFactory, $location, $rootScope){
        
        const self = this;
                        
        self.login = function(){
            authFactory.login(self.user, err => err ? msgs.msgError(err) : $window.location.href = '/');
        };

        self.logout = function(){
            authFactory.logout(() => $window.location.href = '/login.html');
        };

        self.user = authFactory.getUser();
        $rootScope.usuarioLogado = authFactory.getUser();
        console.log('Usuário logado controller:', self.user);

    }]);

})()