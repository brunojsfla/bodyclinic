(function(){
    app.controller('EscalaAtendimentoCtrl', ['$http', 'urls', 'msgs', 'tabsFactory', 'bcUtils', function($http, urls, msgs, tabsFactory, bcUtils){
        const self = this;
        
        //Inicializações
        self.diasSemana = bcUtils.getDiasSemana();

        self.saveEscala = function(){
            // Validações 
            let horaInicio = parseInt(self.escala.horaInicio.substr(0, 2));
            let diaSemana = self.escala.diaSemana;

            //Escala para o mesmo período e mesmo profissional
            for(let i = 0; i < self.escalas.length; i++){
                let diaSemanaAux = self.escalas[i].diaSemana;
                let horaInicioAux = parseInt(self.escalas[i].horaInicio.substr(0,2));
                let horaTerminoAux = parseInt(self.escalas[i].horaTermino.substr(0,2));
                if(self.escala.profissional._id === self.escalas[i].profissional._id){
                    if(diaSemana === diaSemanaAux && (horaInicio >= horaInicioAux && horaInicio <= horaTerminoAux)){
                        msgs.msgError(`O profissional ${self.escalas[i].profissional.nome} já possui uma escala de atendimento para o período informado.`);
                        return;
                    }
                }
            }
                
            $http.post(urls.escalas, self.escala).then(function(response){
                self.getEscalas();
                msgs.msgSuccess('Escala de Atendimento salva com sucesso!');
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao salvar escala de atendimento: ', response.data);
            });
        };

        self.getEscalas = function(){
            $http.get(urls.escalas+'?sort=profissional').then(function(response){
                console.log('Atualizando lista de escalas de atendimento...');
                self.escala = {};
                let escalasAux = response.data; 
                for(let i = 0; i < escalasAux.length; i++){
                    //Profissional
                    $http.get(urls.profissionais + '/' + escalasAux[i].profissional).then(function(response){
                        for(let j = 0; j < escalasAux.length; j++){
                            if(response.data._id === escalasAux[j].profissional)
                                escalasAux[j].profissional = response.data;
                        }
                    }, function(response){
                        console.error('Falha ao recuperar profissional para lista de escalas: ', response.data);
                    });

                    //Ocupação
                    $http.get(urls.ocupacoes + '/' + escalasAux[i].ocupacao).then(function(response){
                        for(let j = 0; j < escalasAux.length; j++){
                            if(response.data._id === escalasAux[j].ocupacao)
                                escalasAux[j].ocupacao = response.data;
                        }
                    }, function(response){
                        console.error('Falha ao recuperar ocupação para lista de escalas: ', response.data);
                    });
                }
                self.escalas = escalasAux;
                tabsFactory.showTabs(self, {tabList: true, tabCreate: true});
                console.log('Escalas de atendimento retornadas : ' + self.escalas.length);
                self.getProfissionais();
            }, function(response){
                console.error('Erro ao buscar escalas de atendimento: ',  response.data.errors);
            });
        };

        self.showUpdate = function(escala){
            self.escala = escala;
            self.setFieldsEscala(escala);
            tabsFactory.showTabs(self, {tabUpdate: true});
        };

        self.showRemove = function(escala){
            self.escala = escala;
            self.setFieldsEscala(escala);
            tabsFactory.showTabs(self, {tabDelete: true});
        };

        self.setEscala = function(){
            const urlUpdate = `${urls.escalas}/${self.escala._id}`;
            $http.put(urlUpdate, self.escala).then(function(response){
                self.getEscalas();
                msgs.msgSuccess('Escala de Atendimento alterada com sucesso!');    
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao alterar escala de atendimento: ', response.data);
            });
        };

        self.deleteEscala = function(){
            const urlDelete = `${urls.escalas}/${self.escala._id}`;
            $http.delete(urlDelete, self.escala).then(function(response){
                self.getEscalas();
                msgs.msgSuccess('Escala de Atendimento excluída com sucesso!');    
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao excluir escala de atendimento: ', response.data);
            });
        };

        self.getProfissionais = function(){
            $http.get(urls.profissionais+'?sort=nome').then(function(response){
                console.log('Atualizando lista de profissionais ativos...');
                self.profissionais = {};
                // Filtro para profissionais somente com vínculo ativo
                let profissionaisAtivos = response.data.filter(function(profissional){
                    return !profissional.dtDemissao;
                }, Object.create(null));
                // Remove profissionais ativos e com mais de um vínculo 
                self.profissionais = profissionaisAtivos.filter(function(profissional){
                    console.log('Stringify: ', JSON.stringify(profissional));
                    return !this[JSON.stringify(profissional.cpf)] && (this[JSON.stringify(profissional.cpf)] = true) && !profissional.dtDemissao;
                }, Object.create(null));
                console.log('Profissionais retornados para suspensão de escala : ' + self.profissionais.length);
            }, function(response){
                console.log('Erro ao buscar profissionais: ',  response.data.errors);
            });
        };

        self.getOcupacoesByProfissional = function(profissional){
            if(profissional){
                $http.get(urls.ocupacoes + `/?_id=${profissional.ocupacao}&sort=nome`).then(function(response){
                    self.ocupacoes = {};
                    self.ocupacoes = response.data;
                    console.log('Ocupações retornadas: ', self.ocupacoes.length);
                    }, function(response){
                    console.error('Falha ao localizar OCUPAÇÕES DO PROFISSIONAL: ', response.data);
                    });
            }else{
                console.log('Nenhum profissional selecionado');
            }
        };

        self.setFieldsEscala = function(escala){
            if(escala){
                self.getProfissionalById(escala);
                self.getOcupacaoById(escala);                              
            }
        };

        // Busca profissional por _id
        self.getProfissionalById = function(escala){
            if(escala){
                $http.get(urls.profissionais + '/' + escala.profissional._id).then(function(response){
                    self.escala.profissional = response.data;
                }, function(response){
                    console.error('Falha ao recuperar profissional para edição e exclusão: ', response.data);
                });
            }
        };

        // Busca ocupação por _id
        self.getOcupacaoById = function(escala){
            if(escala){
                $http.get(urls.ocupacoes + '/' + escala.ocupacao._id).then(function(response){
                    self.getOcupacoesByProfissional(self.escala.profissional);
                    self.escala.ocupacao = response.data;
                    console.log('ESCALA:', self.escala);
                }, function(response){
                    console.error('Falha ao recuperar ocupação para edição e exclusão: ', response.data);
                });
            }
        };

        self.calcHoraTermino = function(inicio, quantidade){
            if(inicio&&quantidade){
                console.log('Calculando hora de término dos atendimentos...');
                self.escala.horaTermino = "";
                let horaInicio = parseInt(inicio.substr(0, 2));
                let horaTermino = horaInicio + quantidade;
                let strHoraTermino = "";
                if(horaTermino < 10)
                    strHoraTermino = '0'+horaTermino+inicio.substr(2, 2);
                else
                    strHoraTermino = horaTermino+inicio.substr(2, 2);

                self.escala.horaTermino = strHoraTermino;
            }/*else
                msgs.msgWarning('Informe a hora de início e quantidade de atendimentos da escala para calculo do término');*/
        }

        self.getEscalas();
    }]);
})()