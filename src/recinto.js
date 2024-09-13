
class Recinto {
    constructor(numero, biomas, tamanhoTotal, animaisExistentes = [], todosAnimais) {
        this.numero = numero;
        this.biomas = biomas;
        this.tamanhoTotal = tamanhoTotal;
        this.animaisExistentes = animaisExistentes;
        this.todosAnimais = todosAnimais;
    }


    //Busca o tamanho do animal para calcular o espaço disponível no recinto
    buscarTamanhoAnimal(especie){
        const animal = this.todosAnimais.find((a)  => a.especie === especie);
        
        return animal.tamanho;
    }

    //Calculando o espaço ocupado pelos animais presentes já no recinto
    calcularEspacoDisponivel(novoAnimal){
        let espacoOcupado = 0;
        let especiesNoRecinto = new Set(); //Set não permite valores duplicados

        //Percorro cada animal existente e somo o espaço ocupado
        for(let i = 0; i < this.animaisExistentes.length; i++){
            let tamanhoAnimal = this.buscarTamanhoAnimal(this.animaisExistentes[i].especie)

            espacoOcupado += tamanhoAnimal * this.animaisExistentes[i].quantidade;

            //adiciono a espécie na lista de especiesNoRecinto
            especiesNoRecinto.add(this.animaisExistentes[i].especie)
        }

        //Adiciono a nova espécie que "vai" entrar no recinto
        especiesNoRecinto.add(novoAnimal.especie)

        // adiciona 1 espaço extra caso haja duas especies
        if (especiesNoRecinto.size > 1){
            espacoOcupado += 1;
        }

        return this.tamanhoTotal - espacoOcupado;
    }

    // Função principal que retorna o espaço disponível no recinto após a inserção do novo animal. False se não houver espaço
    verificarEspaco(novoAnimal, quantidade){
        const espacoDisponivel = this.calcularEspacoDisponivel(novoAnimal) - (novoAnimal.tamanho * quantidade);
        
        if(espacoDisponivel >= 0){
            return espacoDisponivel;
        }
        
        return false;
    }

    //Verifica se algum dos biomas do animal está presente na lista de biomas do recinto
    verificarBioma(novoAnimal){
        return novoAnimal.biomas.some(bioma => this.biomas.includes(bioma)); //True se encontrar ou False se não encontrar
    }

    //Verifica se o animal é carnívoro ou se ele não for, verifica se algum animal no recinto é carnívoro
    verificarCarnivoro(novoAnimal) {

        if (novoAnimal.carnivoro) {
            // Se o animal é carnívoro, verifica se todos no recinto são da mesma espécie
            return this.animaisExistentes.every(animalExistente => animalExistente.especie === novoAnimal.especie);
        }

        // Se o novo animal não for carnívoro, verificar os animais no recinto
        const existeCarnivoro = this.animaisExistentes.some(animalExistente => {
            // Usar a lista todosAnimais para ver se algum animal no recinto é carnívoro
            return this.todosAnimais.some(animal => 
                animal.especie === animalExistente.especie && animal.carnivoro
            );
        });

        // Se encontrar algum carnívoro, retorno false caso contrário, true.
        return !existeCarnivoro;
    }


    //Verifica, caso seja um macaco, se há outros animais no recinto ou se mais de um macaco está sendo adicionado
    verificarMacaco(novoAnimal){
        if (novoAnimal.especie === 'macaco' && 
            this.animaisExistentes.length === 0 &&
            novoAnimal.quantidade < 2  ){
            return false;
        }
        
        return true;
    }

    //Verifica se é um hipopótamo se for, só permite entrar no recinto se for savana e rio ou se está sozinho
    verificarHipopotamo(novoAnimal){
    
        if(novoAnimal.especie === 'hipopotamo' && this.animaisExistentes.length > 0){
            if(this.biomas.includes('savana') && this.biomas.includes('rio')){
                return true;
            }

            return false;
        } 
        
        return true;
   }
}

export { Recinto as Recinto };
