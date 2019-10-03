(function(){
    app.controller('AtendimentoCtrl', ['$http', 'urls', 'msgs', 'tabsFactory', 'bcUtils', function($http, urls, msgs, tabsFactory, bcUtils){
        const self = this;

        //Inicializações
        self.questaoBinaria = bcUtils.getQuestaoBinaria();
        self.resultado = bcUtils.getTipoResultadoExame();

        self.saveAtendimento = function(){
            self.atendimento.estado = 'CONCLUÍDO';
            $http.post(urls.atendimentos, self.atendimento).then(function(response){
                self.getAtendimentos();
                msgs.msgSuccess('Atendimento salvo com sucesso!');
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao salvar atendimento: ', response.data);
            });
        };

        self.getAtendimentos = function(){
            $http.get(urls.atendimentos+'?sort=dtAtendimento').then(function(response){
                console.log('Atualizando lista de atendimentos...');
                self.atendimento = {examesAvaliados: [{}], examesSolicitados: [{}], receituario: [{}]};
                let atendimentoAux = response.data; 
                for(let i = 0; i < atendimentoAux.length; i++){
                    //Paciente
                    $http.get(urls.pacientes + '/' + atendimentoAux[i].paciente).then(function(response){
                        for(let j = 0; j < atendimentoAux.length; j++){
                            if(response.data._id === atendimentoAux[j].paciente)
                                atendimentoAux[j].paciente = response.data;
                        }
                    }, function(response){
                        console.error('Falha ao recuperar paciente para lista de atendimento: ', response.data);
                    });

                    //Profissional
                    $http.get(urls.profissionais + '/' + atendimentoAux[i].profissional).then(function(response){
                        for(let j = 0; j < atendimentoAux.length; j++){
                            if(response.data._id === atendimentoAux[j].profissional)
                                atendimentoAux[j].profissional = response.data;
                        }
                    }, function(response){
                        console.error('Falha ao recuperar profissional para lista de atendimento: ', response.data);
                    });

                    //Ocupação
                    $http.get(urls.ocupacoes + '/' + atendimentoAux[i].ocupacao).then(function(response){
                        for(let j = 0; j < atendimentoAux.length; j++){
                            if(response.data._id === atendimentoAux[j].ocupacao)
                                atendimentoAux[j].ocupacao = response.data;
                        }
                    }, function(response){
                        console.error('Falha ao recuperar ocupação para lista de atendimento: ', response.data);
                    });
                }
                self.atendimentos = atendimentoAux;
                tabsFactory.showTabs(self, {tabList: true, tabCreate: true});
                self.atendimento.dtAtendimento = new Date();
                //Inicalização dos objetos necessários
                self.getProfissionais();
                self.getPacientes();
                self.getMedicamentos();
                self.getProcedimentos();
                console.log('Atendimentos retornados : ' + self.atendimentos.length);
            }, function(response){
                console.log('Erro ao buscar atendimentos: ',  response.data.errors);
            });
        };

        self.showView = function(atendimento){
            self.atendimento = atendimento;
            self.setFieldsAtendimento(atendimento);
            tabsFactory.showTabs(self, {tabDelete: true});
        };

        self.showCancel = function(atendimento){
            self.atendimento = atendimento;
            self.setFieldsAtendimento(atendimento);
            tabsFactory.showTabs(self, {tabUpdate: true});
        }

        self.setFieldsAtendimento = function(atendimento){
            if(atendimento){
                // Seta Datas
                self.atendimento.dtAtendimento = new Date(atendimento.dtAtendimento);
                if(atendimento.dtCancelamento)
                    self.atendimento.dtCancelamento = new Date(atendimento.dtCancelamento);
                self.atendimento.dtSaida = new Date(atendimento.dtSaida);
                if(atendimento.dtRetorno)
                    self.atendimento.dtRetorno = new Date(atendimento.dtRetorno);
                // Seta Objetos
                self.getProfissionalById(atendimento);
                self.getOcupacaoById(atendimento);
                self.getPacienteById(atendimento);
                self.calcImc(atendimento.peso, atendimento.altura);
                self.getExameAvaliadoById(atendimento);
                self.getExameSolicitadoById(atendimento);
                self.getMedicamentoById(atendimento);
                
            }else{
                console.log('Nenhum atendimento selecionado');
            }
        };

        self.cancelAtendimento = function(){
            self.atendimento.estado = 'CANCELADO';
            const urlUpdate = `${urls.atendimentos}/${self.atendimento._id}`;
            $http.put(urlUpdate, self.atendimento).then(function(response){
                self.getAtendimentos();
                msgs.msgSuccess('Atendimento cancelado com sucesso!');    
            }, function(response){
                msgs.msgError(response.data.errors);
                console.error('Erro ao cancelar atendimento: ', response.data);
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
                console.log('Profissionais retornados para atendimento: ' + self.profissionais.length);
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

        // Busca profissional por _id
        self.getProfissionalById = function(atendimento){
            if(atendimento){
                $http.get(urls.profissionais + '/' + atendimento.profissional).then(function(response){
                    self.atendimento.profissional = response.data;
                }, function(response){
                    console.error('Falha ao recuperar profissional para visualização e cancelamento: ', response.data);
                });
            }
        };

        // Busca ocupação por _id
        self.getOcupacaoById = function(atendimento){
            if(atendimento){
                $http.get(urls.ocupacoes + '/' + atendimento.ocupacao).then(function(response){
                    self.getOcupacoesByProfissional(self.atendimento.profissional);
                    self.atendimento.ocupacao = response.data;
                }, function(response){
                    console.error('Falha ao recuperar ocupação para visulização e cancelamento: ', response.data);
                });
            }
        };

        // Busca paciente por _id
        self.getPacienteById = function(atendimento){
            if(atendimento){
                $http.get(urls.pacientes + '/' + atendimento.paciente).then(function(response){
                    self.atendimento.paciente = response.data;
                    self.getFieldsByPaciente(self.atendimento.paciente);
                }, function(response){
                    console.error('Falha ao recuperar profissional para visualização e cancelamento: ', response.data);
                });
            }
        };

        // Busca medicamento por _id
        self.getMedicamentoById = function(atendimento){
            if(atendimento){
                for(let i = 0;  i < atendimento.receituario.length; i++){
                    $http.get(urls.medicamentos + '/' + atendimento.receituario[i].medicamento).then(function(response){
                        self.atendimento.receituario[i].medicamento = response.data;
                    }, function(response){
                        console.error('Falha ao recuperar medicamento para visualização e cancelamento: ', response.data);
                    });
                }
            }
        };

        // Busca exames solicitados por _id
        self.getExameSolicitadoById = function(atendimento){
            if(atendimento){
                for(let i = 0;  i < atendimento.examesSolicitados.length; i++){
                    $http.get(urls.procedimentos + '/' + atendimento.examesSolicitados[i].procedimento).then(function(response){
                        self.atendimento.examesSolicitados[i].procedimento = response.data;
                    }, function(response){
                        console.error('Falha ao recuperar exame solicitado para visualização e cancelamento: ', response.data);
                    });
                }
            }
        };

         // Busca exames avaliados por _id
         self.getExameAvaliadoById = function(atendimento){
            if(atendimento){
                for(let i = 0;  i < atendimento.examesAvaliados.length; i++){
                    self.atendimento.examesAvaliados[i].dtResultado = new Date(atendimento.examesAvaliados[i].dtResultado);
                    $http.get(urls.procedimentos + '/' + atendimento.examesAvaliados[i].procedimento).then(function(response){
                        self.atendimento.examesAvaliados[i].procedimento = response.data;
                    }, function(response){
                        console.error('Falha ao recuperar exame avaliado para visualização e cancelamento: ', response.data);
                    });
                }
            }
        };

        // Retorna pacientes
        self.getPacientes = function(){
            $http.get(urls.pacientes).then(function(response){
                console.log('Atualizando lista de pacientes...', response);
                self.pacientes = {};
                self.pacientes = response.data;
                console.log('Pacientes retornados para atendimento: ' + self.pacientes.length);
            }, function(response){
                console.log('Erro ao buscar pacientes: ',  response.data.errors);
            });
        };

        // Seta dados do paciente
        self.getFieldsByPaciente = function(paciente){
            if(paciente){
                $http.get(urls.pacientes + '/' + paciente._id).then(function(response){
                    self.atendimento.paciente.dtNasc = new Date(response.data.dtNasc);
                    self.atendimento.paciente.sexo = response.data.sexo;
                    console.log('PACIENTE:', self.atendimento.paciente);
                }, function(response){
                    console.error('Falha ao recuperar paciente para edição e exclusão: ', response.data);
                });
            }
        };

        // Retorna medicamentos
        self.getMedicamentos = function(){
            $http.get(urls.medicamentos).then(function(response){
                console.log('Atualizando lista de medicamentos...', response);
                self.medicamentos = {};
                self.medicamentos = response.data;
                console.log('Medicamentos retornados: ' + self.medicamentos.length);
            }, function(response){
                console.log('Erro ao buscar medicamentos: ',  response.data.errors);
            });
        };

        self.removeDuplicateMedicamento = function(index, receituario){
            if(self.atendimento.receituario.length > 1){
                for(var i = 0; i < index; i++){
                    if(self.atendimento.receituario[i].medicamento._id === receituario.medicamento._id){
                        msgs.msgError('O medicamento informado já consta no receituário!');
                        self.atendimento.receituario.splice(index, 1);
                        return;
                    }
                }
            }
        };

        self.calcImc = function(peso, altura){
            if(peso && altura){
                console.log('Calculando IMC...');
                let pesoAux = parseFloat(peso);
                let alturaAux = parseFloat(altura) / 100;
                let aux = pesoAux / (alturaAux * alturaAux);
                aux = aux.toFixed(2);
                if(aux < 18.5)
                    self.imc = aux + ' - Magreza';
                else
                    if(aux >= 18.5 && aux < 25)
                        self.imc = aux + ' - Normal';
                    else
                        if(aux >= 25 && aux < 30)
                            self.imc = aux + ' - Sobrepeso';
                        else
                            if(aux >= 30 && aux < 40)
                                self.imc = aux + ' - Obesidade';
                            else
                                if(aux > 40)
                                    self.imc = aux + ' - Obesidade Grave';
                console.log('IMC calculado com sucesso!', self.imc);
            }else
                self.imc = 0;
        };

        // Retorna procedimentos
        self.getProcedimentos = function(){
            $http.get(urls.procedimentos+'?sort=nome').then(function(response){
                console.log('Atualizando lista de procedimentos...', response);
                self.procedimentos = {};
                self.procedimentos = response.data;
                console.log('Procedimentos retornados: ' + self.procedimentos.length);
            }, function(response){
                console.log('Erro ao buscar procedimentos: ',  response.data.errors);
            });
        };

        self.removeDuplicateExameSolicitado = function(index, exame){
            if(self.atendimento.examesSolicitados.length > 1){
                for(var i = 0; i < index; i++){
                    if(self.atendimento.examesSolicitados[i].procedimento._id === exame.procedimento._id){
                        msgs.msgError('O exame informado já consta para solicitação!');
                        self.atendimento.examesSolicitados.splice(index, 1);
                        return;
                    }
                }
            }
        };

         self.removeDuplicateObjects = function(index, obj, item){
            switch(obj){
                case 'receituario':
                    if(self.atendimento.receituario.length > 1){
                        for(var i = 0; i < index; i++){
                            if(self.atendimento.receituario[i].medicamento._id === item.medicamento._id){
                                msgs.msgError('O medicamento informado já consta no receituário!');
                                self.atendimento.receituario.splice(index, 1);
                                return;
                            }
                        }
                    }
                    break;
                case 'exameSol':
                    if(self.atendimento.examesSolicitados.length > 1){
                        for(var i = 0; i < index; i++){
                            if(self.atendimento.examesSolicitados[i].procedimento._id === item.procedimento._id){
                                msgs.msgError('O exame informado já consta para solicitação!');
                                self.atendimento.examesSolicitados.splice(index, 1);
                                return;
                            }
                        }
                    }
                    break;
                case 'exameAval':
                    if(self.atendimento.examesAvaliados.length > 1){
                        for(var i = 0; i < index; i++){
                            if(self.atendimento.examesAvaliados[i].procedimento._id === item.procedimento._id){
                                msgs.msgError('O exame informado já consta para avaliação!');
                                self.atendimento.examesAvaliados.splice(index, 1);
                                return;
                            }
                        }
                    }
                    break;
                default:
                    return;
            }
            
            
        };

        self.addObject = function(index, obj){
            switch(obj){
                case 'receituario':
                    self.atendimento.receituario.splice(index + 1, 0, {});
                    break;
                case 'exameSol':
                    self.atendimento.examesSolicitados.splice(index + 1, 0, {});
                    break;
                case 'exameAval':
                    self.atendimento.examesAvaliados.splice(index + 1, 0, {});
                    break;
                default:
                    return;
            }
            
        };

        self.removeObject = function(index, obj){
            switch(obj){
                case 'receituario':
                    if(self.atendimento.receituario.length > 1)
                        self.atendimento.receituario.splice(index, 1);
                    break;
                case 'exameSol':
                    if(self.atendimento.examesSolicitados.length > 1)
                        self.atendimento.examesSolicitados.splice(index, 1);
                    break;
                case 'exameAval':
                    if(self.atendimento.examesAvaliados.length > 1)
                        self.atendimento.examesAvaliados.splice(index, 1);
                    break;
                default:
                    return;
            }
            
        };

        self.clearObjects = function(obj){
            switch(obj){
                case 'receituario':
                    self.atendimento.receituario = [{}];
                    break;
                case 'exameSol':
                    self.atendimento.examesSolicitados = [{}];
                    break;
                case 'exameAval':
                    self.atendimento.examesAvaliados = [{}];
                    break;
                default:
                    return;
            }
        
        };

        self.getAtendimentos();
    }]);
})()