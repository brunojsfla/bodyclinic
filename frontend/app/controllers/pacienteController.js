(function(){
    app.controller('PacienteCtrl', ['$http', 'urls', 'msgs', 'tabsFactory', function($http, urls, msgs, tabsFactory){
        const self = this;

        self.savePaciente = function(){
            $http.post(urls.pacientes, self.paciente).then(function(response){
                self.getPacientes();
                msgs.msgSuccess('Paciente salvo com sucesso!');
            }, function(response){
                if(response.data.code === 11000){
                    if(response.data.errmsg.includes('cpf'))
                        msgs.msgError('O CPF informado já existe para um paciente cadastrado!');
                    if(response.data.errmsg.includes('email'))
                        msgs.msgError('O e-mail informado já existe para um paciente cadastrado!');
                    if(response.data.errmsg.includes('cns'))
                        msgs.msgError('O CNS informado já existe para um paciente cadastrado!');
                }else{
                    msgs.msgError(response.data.errors);
                }
                console.error('Erro ao salvar paciente: ', response.data);
            });
        };

        self.getPacientes = function(){
            $http.get(urls.pacientes).then(function(response){
                console.log('Atualizando lista de pacientes...');
                self.paciente = {};
                self.pacientes = response.data;
                tabsFactory.showTabs(self, {tabList: true, tabCreate: true});
                console.log('Pacientes retornados : ' + self.pacientes.length);
            }, function(response){
                console.log('Erro ao buscar pacientes: ',  response.data.errors);
            });
        };

        self.showUpdate = function(paciente){
            self.paciente = paciente;
            tabsFactory.showTabs(self, {tabUpdate: true});
        };

        self.showRemove = function(paciente){
            self.paciente = paciente;
            msgs.msgInfo('Por favor, verifique os dados e clique no botão EXCLUIR caso queira realmente remover o paciente ou clique em CANCELAR para retornar.');
            tabsFactory.showTabs(self, {tabDelete: true});
        }

        self.setPaciente = function(){
            const urlUpdate = `${urls.pacientes}/${self.paciente._id}`;
            $http.put(urlUpdate, self.paciente).then(function(response){
                self.getUsers();
                msgs.msgSuccess('Paciente alterado com sucesso!');    
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao alterar paciente: ', response.data);
            });
        };

        self.deletePaciente = function(){
            const urlDelete = `${urls.pacientes}/${self.paciente._id}`;
            $http.delete(urlDelete, self.paciente).then(function(response){
                self.getPacientes();
                msgs.msgSuccess('Paciente excluído com sucesso!');    
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao excluir paciente: ', response.data);
            });
        };

        self.getPacientes();
    }]);
})()