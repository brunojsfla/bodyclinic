(function(){
    app.controller('UsuarioCtrl', ['$http', 'urls', function($http, urls){
        const self = this;
        self.usuarios = {};
        
        self.getUsers = function(){
            $http.get(urls.usuarios).then(function(response){
                self.usuarios = response.data;
                console.log('Usuarios retornados : ' + self.usuarios.length);
            });
        };

        self.getUsers();
    }]);
})()