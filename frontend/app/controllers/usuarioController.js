(function(){
    app.controller('UsuarioCtrl', ['$http', 'urls', function($http, urls){
        const self = this;
        self.usuarios = {};

        self.setUser = function(){
            $http.post(urls.usuarios, self.usuario).then(function(response){
                self.usuario = {};
                console.log('Usuário salvo com sucesso!');
            }, function(response){

            });
        };

        self.getUsers = function(){
            $http.get(urls.usuarios).then(function(response){
                self.usuarios = response.data;
                console.log('Usuarios retornados : ' + self.usuarios.length);
            }, function(response){
                console.log(`Erro ao buscar usuários: ${reponse}`);
            });
        };

        self.getUsers();
    }]);
})()