// recintos-zoo.js
import { Recinto } from './recinto.js';
import { Animal } from './animal.js';

class RecintosZoo {
    constructor() {

        //Criando uma lista em memória de todos os animais
        this.animais = [
            new Animal('leao', 3, ['savana'], true),
            new Animal('leopardo', 2, ['savana'], true),
            new Animal('crocodilo', 3, ['rio'], true),
            new Animal('macaco', 1, ['savana','floresta'], false),
            new Animal('gazela', 2, ['savana'], false),
            new Animal('hipopotamo', 4, ['savana','rio'], false)
        ]

        //Criando uma lista em memória com todos os recintos. Passando a lista de animais como parâmetro para as validações necessárias
        this.recintos =[
            new Recinto(1, ['savana'], 10, [{especie: 'macaco', quantidade: 3}], this.animais ),
            new Recinto(2, ['floresta'], 5, [], this.animais ),
            new Recinto(3, ['savana','rio'], 7, [{especie: 'gazela', quantidade: 1}], this.animais ),
            new Recinto(4, ['rio'], 8, [], this.animais ),
            new Recinto(5, ['savana'], 9, [{especie: 'leao', quantidade: 1}], this.animais )

        ]
    }

    // Função que verifica se a quantidade é um número
    isNumber(n) {
        return !isNaN(n) && typeof n ==="number";
    }

    analisaRecintos(especie, quantidade) {
        //Busco a especie na lista de animais, ajustando o valor digitado para letras minúsculas
        const novoAnimal = this.animais.find((animal) => animal.especie === especie.toLowerCase());

        //Se não encontrou espécie então retorna animal inválido
        if (!novoAnimal){
            return {erro: "Animal inválido"};
        }
        
        //Se não for um número ou se a quantidade for menor ou igual a zero retorna quantidade inálida
        if(!this.isNumber(quantidade) || quantidade <= 0){
            return {erro: "Quantidade inválida"};
        }

        const recintosViaveis =[]

        //Percorro todos os recintos
        for(let i = 0; i < this.recintos.length; i++){
            const recinto = this.recintos[i];

            //Chamo todas as funções de validação
            if(recinto.verificarBioma(novoAnimal) &&
                recinto.verificarEspaco(novoAnimal, quantidade) !== false  &&
                recinto.verificarCarnivoro(novoAnimal) &&
                recinto.verificarMacaco(novoAnimal) &&
                recinto.verificarHipopotamo(novoAnimal)){
                    
                    //Chamo novamente a função verificarEspaco para saber o espaço livre no recinto após a inserção do animal
                    const espacoAposAnimal = recinto.verificarEspaco(novoAnimal, quantidade);

                    //Crio a frase de retorno para o recinto viável
                    const descricao = `Recinto ${recinto.numero} (espaço livre: ${espacoAposAnimal} total: ${recinto.tamanhoTotal})`;

                    //Adiciono ao array
                    recintosViaveis.push(descricao);
            }                         
        }


        // Retorna a lista de recintos viáveis ou uma mensagem de erro
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis: recintosViaveis };
        
    }
}

export { RecintosZoo as RecintosZoo };
