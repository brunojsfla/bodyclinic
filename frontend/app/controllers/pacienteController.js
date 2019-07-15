(function(){
    app.controller('PacienteCtrl', ['$http', 'urls', 'msgs', 'tabsFactory', 'bcUtils', function($http, urls, msgs, tabsFactory, bcUtils){
        const self = this;
        
        //Inicializações
        self.sexo = bcUtils.getSexo();
        self.tipoLogradouro = bcUtils.getTipoLogradouro();

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
                self.getEstados();
            }, function(response){
                console.log('Erro ao buscar pacientes: ',  response.data.errors);
            });
        };

        self.showUpdate = function(paciente){
            self.paciente = paciente;
            console.log(self.paciente);
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
                self.getPacientes();
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

        self.getEstados = function(){
            $http.get(urls.estados + '/?sort=nome').then(function(response){
                self.estados = {};
                self.estados = response.data;
                console.log('Estados retornados: ', self.estados.length);
            }, function(response){
                console.error('Falha ao buscar ESTADOS: ', response.data);
            });
        };

        self.getMunicipiosByEstado = function(estado){
            if(estado){
                self.estado = estado;
                $http.get(urls.municipios + `/?siglaUf=${self.estado.siglaUf}&sort=nome`).then(function(response){
                    self.municipios = {};
                    self.municipios = response.data;
                    console.log('Municípios retornados: ', self.municipios.length);
                    }, function(response){
                    console.error('Falha ao localizar MUNICÍPIOS: ', response.data);
                    });
            }else{
                console.log('Nenhum estado selecionado');
            }
        };

        self.getIdByMunicipio = function(municipio){
            if(municipio){
                console.log('Município: ' + municipio.nome + ' - ' + 'ID: ' + municipio._id);
                return municipio._id;
            }else{
                console.log('Nenhum município selecionado');
            }
        };

        self.getPacientes();
    }]);
})()