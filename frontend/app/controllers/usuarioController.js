(function(){
    app.controller('UsuarioCtrl', ['$http', 'urls', 'msgs', function($http, urls, msgs){
        const self = this;
        self.usuarios = {};

        self.setUser = function(){
            $http.post(urls.usuarios, self.usuario).then(function(response){
                self.usuario = {};
                self.getUsers();
                msgs.msgSuccess('Usuário salvo com sucesso!');
            }, function(response){
                msgs.msgError('Não foi possível salvar o usuário!');
                console.error('Erro ao salvar usuário: ', response.data.errors);
            });
        };

        self.getUsers = function(){
            $http.get(urls.usuarios).then(function(response){
                self.usuarios = response.data;
                console.log('Usuarios retornados : ' + self.usuarios.length);
            }, function(response){
                console.log('Erro ao buscar usuários: ',  response.data.errors);
            });
        };

        self.getUsers();
    }]);
})()