(function(){
    app.controller('SuspensaoEscalaCtrl', ['$http', 'urls', 'msgs', 'tabsFactory', 'bcUtils', function($http, urls, msgs, tabsFactory, bcUtils){
        const self = this;
        
        //Inicializações
        self.motivos = bcUtils.getMotivoSuspensaoEscala();

        self.saveSuspensao = function(){
            $http.post(urls.suspensoes, self.suspensao).then(function(response){
                self.getSuspensoes();
                msgs.msgSuccess('Suspensão de Escala salva com sucesso!');
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao salvar suspensão de escala: ', response.data);
            });
        };

        self.getSuspensoes = function(){
            $http.get(urls.suspensoes+'?sort=dtInicio').then(function(response){
                console.log('Atualizando lista de suspensões de escala...');
                self.suspensao = {};
                self.suspensoes = response.data;
                tabsFactory.showTabs(self, {tabList: true, tabCreate: true});
                console.log('Suspensões de escala retornadas : ' + self.suspensoes.length);
                self.getProfissionais();
            }, function(response){
                console.error('Erro ao buscar suspensões de escala: ',  response.data.errors);
            });
        };

        self.showUpdate = function(suspensao){
            self.suspensao = suspensao;
            self.setFieldsSuspensao(suspensao);
            tabsFactory.showTabs(self, {tabUpdate: true});
        };

        self.showRemove = function(suspensao){
            self.suspensao = suspensao;
            self.setFieldsSuspensao(suspensao);
            tabsFactory.showTabs(self, {tabDelete: true});
        };

        self.setSuspensao = function(){
            const urlUpdate = `${urls.suspensoes}/${self.suspensao._id}`;
            $http.put(urlUpdate, self.suspensao).then(function(response){
                self.getSuspensoes();
                msgs.msgSuccess('Suspensão de Escala alterada com sucesso!');    
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao alterar suspensao de escala: ', response.data);
            });
        };

        self.deleteSuspensao = function(){
            const urlDelete = `${urls.suspensoes}/${self.suspensao._id}`;
            $http.delete(urlDelete, self.suspensao).then(function(response){
                self.getSuspensoes();
                msgs.msgSuccess('Suspensão de escala excluída com sucesso!');    
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao excluir suspensão de escala: ', response.data);
            });
        };

        self.getProfissionais = function(){
            $http.get(urls.profissionais+'?sort=nome').then(function(response){
                console.log('Atualizando lista de profissionais ativos...');
                self.profissionais = {};
                self.profissionais = response.data;
                console.log('Profissionais retornados para suspensão de escala : ' + self.profissionais.length);
            }, function(response){
                console.log('Erro ao buscar profissionais: ',  response.data.errors);
            });
        };

        self.setFieldsSuspensao = function(suspensao){
            if(suspensao){
                self.suspensao.dtInicio = new Date(self.suspensao.dtInicio);
                self.suspensao.dtTermino = new Date(self.suspensao.dtTermino);

                self.getProfissionalById(suspensao);
                
            }
        };

        // Busca profissional por _id
        self.getProfissionalById = function(suspensao){
            if(suspensao){
                $http.get(urls.profissionais + '/' + suspensao.profissional).then(function(response){
                    self.suspensao.profissional = response.data;
                }, function(response){
                    console.error('Falha ao recuperar profissional: ', response.data);
                });
            }
        };

        self.getSuspensoes();
    }]);
})()