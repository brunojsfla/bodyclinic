module.exports = function(cns){
    if((cns.length < 15) 
    || (cns.startsWith('3') 
    || cns.startsWith('4')
    || cns.startsWith('5')
    || cns.startsWith('6')))
        return false; 

    //Valida CNS iniciado com 1 ou 2
    if(cns.startsWith('1') || cns.startsWith('2')){

    }
    //Valida Cns Definitivo 7, 8 ou 9
    if(cns.startsWith('7') || cns.startsWith('8') || cns.startsWith('9')){
        
    }
};