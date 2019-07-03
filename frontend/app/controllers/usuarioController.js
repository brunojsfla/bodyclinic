(function(){
    app.controller('UsuarioCtrl', ['$http', 'urls', function($http, urls){
        const self = this;

        self.getUsers = function(){

            $http.get(urls.usuarios).then(function(response){
                if(response.data){
                    self.usuario = response.data;
                    console.log('Usuário:' + self.usuario[0].nome + ' - ' + self.usuario[0].cpf);
                }else
                    console.log('Response tá valendo: ', response);
                
            });
        };

        self.getUsers();
    }]);
})()