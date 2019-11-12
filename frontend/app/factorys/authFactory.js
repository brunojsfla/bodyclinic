(function(){
    app.factory('authFactory', ['$http', 'urls', '$rootScope', function($http, urls, $rootScope){
        
        let user = null;

        function getUser(){
            if(!user){
                user = JSON.parse(localStorage.getItem(urls.userKey));
                console.log('Usuario logado factory:', user);
                return user;
            }
        };
        
        function login(user, callback){
            submit('login', user, callback);
        };

        function logout(callback){
            localStorage.removeItem(urls.userKey);
            $http.defaults.headers.common.Authorization = '';
            user = null
            if(callback) callback(null);
        };

        function submit(url, user, callback){
            $http.post(urls.oapi+'/'+url, user).then(function(response){
                localStorage.setItem(urls.userKey, JSON.stringify(response.data));
                $http.defaults.headers.common.Authorization = response.data.token;
                if (callback) callback(null, response.data);
            }, function(response){
                if (callback) callback(response.data.errors, null);
            });
        };

        return { login, logout, getUser };
    }]);
})();