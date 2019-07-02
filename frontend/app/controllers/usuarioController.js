(function(){
    app.controller('UsuarioCtrl', ['$http', function($http){
        const self = this;

        self.getUsers = function(){
            const url = 'http://localhost:3003/apibc/usuarios';

            $http.get(url).then(function(response){
                if(response.data){
                    self.usuario = response.data;
                    console.log('Usuário: ', self.usuario[0].nome);
                }else
                    console.log('Response tá valendo: ', response);
                
            });
        };

        self.getUsers();
    }]);
})()