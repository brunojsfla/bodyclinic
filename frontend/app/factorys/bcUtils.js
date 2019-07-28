(function(){
    app.factory('bcUtils', [function(){

        function getSexo(){
            let sexo = [];

            sexo.push({valor: 0, nome: 'MASCULINO'});
            sexo.push({valor: 1, nome: 'FEMININO'});

            return sexo;
        };

        function getPerfil(){
            let perfil = [];

            perfil.push({valor: 0, nome: 'ADMINISTRADOR'});
            perfil.push({valor: 1, nome: 'PROFISSIONAL'});
            perfil.push({valor: 2, nome:'AUXILIAR'});

            return perfil;
        };

        function getTipoLogradouro(){
            let tipoLogradouro = [];

            tipoLogradouro.push('VILA'); 
            tipoLogradouro.push('LARGO');
            tipoLogradouro.push('TRAVESSA');
            tipoLogradouro.push('VIELA'); 
            tipoLogradouro.push('LOTEAMENTO'); 
            tipoLogradouro.push('PÁTIO'); 
            tipoLogradouro.push('VIADUTO'); 
            tipoLogradouro.push('AREA');  
            tipoLogradouro.push('VIA'); 
            tipoLogradouro.push('AEROPORTO'); 
            tipoLogradouro.push('VEREDA'); 
            tipoLogradouro.push('DISTRITO'); 
            tipoLogradouro.push('VALE'); 
            tipoLogradouro.push('NÚCLEO'); 
            tipoLogradouro.push('TREVO'); 
            tipoLogradouro.push('FAZENDA');                    
            tipoLogradouro.push('TRECHO'); 
            tipoLogradouro.push('ESTRADA'); 
            tipoLogradouro.push('SÍTIO'); 
            tipoLogradouro.push('FEIRA'); 
            tipoLogradouro.push('SETOR'); 
            tipoLogradouro.push('MORRO'); 
            tipoLogradouro.push('RUA'); 
            tipoLogradouro.push('CHÁCARA'); 
            tipoLogradouro.push('RODOVIA');   
            tipoLogradouro.push('RESIDENCIAL'); 
            tipoLogradouro.push('AVENIDA'); 
            tipoLogradouro.push('COLÔNIA'); 
            tipoLogradouro.push('RECANTO'); 
            tipoLogradouro.push('QUADRA'); 
            tipoLogradouro.push('PRAÇA'); 
            tipoLogradouro.push('CONDOMÍNIO');
            tipoLogradouro.push('PASSARELA'); 
            tipoLogradouro.push('PARQUE'); 
            tipoLogradouro.push('ESPLANADA'); 
            tipoLogradouro.push('LAGOA'); 
            tipoLogradouro.push('FAVELA'); 
            tipoLogradouro.push('LADEIRA'); 
            tipoLogradouro.push('LAGO'); 
            tipoLogradouro.push('CONJUNTO'); 
            tipoLogradouro.push('JARDIM'); 
            tipoLogradouro.push('ESTAÇÃO'); 
            tipoLogradouro.push('CAMPO'); 
            tipoLogradouro.push('ALAMEDA');

            tipoLogradouro.sort();

            return tipoLogradouro;

        };

        function getMotivoSuspensaoEscala(){
            let motivo = [];

            motivo.push({valor: 0, nome: 'FÉRIAS'});
            motivo.push({valor: 1, nome: 'FOLGA'});
            motivo.push({valor: 2, nome:'LUTO'});
            motivo.push({valor: 2, nome:'CONGRESSO'});
            motivo.push({valor: 2, nome:'CONDIÇÃO DE SAÚDE'});
            motivo.push({valor: 2, nome:'CONDIÇÃO DE TRABALHO'});
            motivo.push({valor: 2, nome:'DETERMINAÇÃO LEGAL'});
            motivo.push({valor: 2, nome:'OUTRO'});

            return motivo;
        };

        return { getSexo, getPerfil, getTipoLogradouro, getMotivoSuspensaoEscala };
    }]);
})();