(function(){
    app.factory('authFactory', ['$http', 'urls', function($http, urls){
        
        function login(user, callback){
            submit('login', user, callback);
        };

        function submit(url, user, callback){
            $http.post(urls.oapi+'/'+url, user).then(function(response){
                console.log('Resposta:', response);
                localStorage.setItem(urls.userKey, JSON.stringify(response.data));
                $http.defaults.headers.common.Authorization = response.data.token;
                if (callback) callback(null, response.data);
            }, function(response){
                console.log('Resposta com erro:', response.data.errors);
                if (callback) callback(response.data.errors, null)
            });
        };

        return { login };
    }]);
})();