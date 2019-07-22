(function(){
    app.controller('ProfissionalCtrl', ['$http', 'urls', 'msgs', 'tabsFactory', 'bcUtils', function($http, urls, msgs, tabsFactory, bcUtils){
        const self = this;
        
        //Inicializações
        self.sexo = bcUtils.getSexo();

        self.saveProfissional = function(){
            $http.post(urls.profissionais, self.profissional).then(function(response){
                self.getProfissionais();
                msgs.msgSuccess('Profissional salvo com sucesso!');
            }, function(response){
                if(response.data.code === 11000){
                    if(response.data.errmsg.includes('cpf'))
                        msgs.msgError('O CPF informado já existe para um profissional cadastrado!');
                    if(response.data.errmsg.includes('email'))
                        msgs.msgError('O e-mail informado já existe para um profissional cadastrado!');
                    if(response.data.errmsg.includes('cns'))
                        msgs.msgError('O CNS informado já existe para um profissional cadastrado!');
                }else{
                    msgs.msgError(response.data.errors);
                }
                console.error('Erro ao salvar profissional: ', response.data);
            });
        };

        self.getProfissionais = function(){
            $http.get(urls.profissionais+'?sort=dtAdmissao').then(function(response){
                console.log('Atualizando lista de profissionais...');
                self.profissional = {cbo:[{}]};
                self.profissionais = response.data;
                tabsFactory.showTabs(self, {tabList: true, tabCreate: true});
                console.log('Profissionais retornados : ' + self.profissionais.length);
                self.getOcupacoes();
            }, function(response){
                console.log('Erro ao buscar profissionais: ',  response.data.errors);
            });
        };

        self.showUpdate = function(profissional){
            self.profissional = profissional;
            self.setFieldsProfissional(profissional);
            tabsFactory.showTabs(self, {tabUpdate: true});
        };

        self.showRemove = function(profissional){
            self.profissional = profissional;
            self.setFieldsProfissional(profissional);
            tabsFactory.showTabs(self, {tabDelete: true});
        };

        self.setProfissional = function(){
            const urlUpdate = `${urls.profissionais}/${self.profissional._id}`;
            self.profissional.dtAlt = new Date();
            $http.put(urlUpdate, self.profissional).then(function(response){
                self.getProfissionais();
                msgs.msgSuccess('Profissional alterado com sucesso!');    
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao alterar profissional: ', response.data);
            });
        };

        self.deleteProfissional = function(){
            const urlDelete = `${urls.profissionais}/${self.profissional._id}`;
            $http.delete(urlDelete, self.profissional).then(function(response){
                self.getProfissionais();
                msgs.msgSuccess('Profissional excluído com sucesso!');    
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao excluir profissional: ', response.data);
            });
        };

        self.addOcupacao = function(index){
            self.profissional.cbo.splice(index + 1, 0, {});
        };

        self.deleteOcupacao = function(index){
            if(self.profissional.cbo.length > 1){
                self.profissional.cbo.splice(index, 1);
            }
        };

        self.getOcupacoes = function(){
            $http.get(urls.ocupacoes+'?sort=nome').then(function(response){
                console.log('Atualizando lista de ocupações...');
                self.ocupacoes = {};
                self.ocupacoes = response.data;
                console.log('Ocupacões retornadas : ' + self.ocupacoes.length);
            }, function(response){
                console.log('Erro ao buscar ocupacoes: ',  response.data.errors);
            });
        };

        self.setFieldsProfissional = function(profissional){
            if(profissional){
                self.profissional.dtNasc = new Date(self.profissional.dtNasc);
                for(var i = 0; i < self.profissional.cbo.length; i++){
                    self.profissional.cbo[i].dtAdmissao = new Date(self.profissional.cbo[i].dtAdmissao);
                    self.profissional.cbo[i].dtDemissao = new Date(self.profissional.cbo[i].dtDemissao);
                }
            }
        };

        self.getProfissionais();
    }]);
})()