const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');

const $containerBtnFormOne = $('#containerBtnFormOne');
const $btnFormOne = $('#btnFormOne');
const $containerBtnFormTwo = $('#containerBtnFormTwo');
const $btnFormTwo = $('#btnFormTwo');
const $containerBtnFormThree = $('#containerBtnFormThree');
const $btnFormThree = $('#btnFormThree');
const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputDataNascimento = $('#dataNascimento');
const $inputEmail = $('#email');
const $inputMinibio = $('#minibio');
const $inputEndereco = $('#endereco');
const $inputComplemento = $('#complemento');
const $inputCidade = $('#cidade');
const $inputCep = $('#cep');
const $inputHabilidades = $('#habilidades');
const $inputPontosForte = $('#pontosForte');

let nomeValido = false;
let sobrenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;
let enderecoValido = false;
let cidadeValido = false;
let cepValido = false;
let habilidadesValido = false;
let pontosForteValido = false;

const minLenghtText = 2;
const minLenghtTextArea = 10;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/

function validarInput(element, minLenght, maxLength, regex){
    const closest = $(element).closest('.input-data');
    if (!element.value 
        || (minLenght && element.value.trim().lenght < minLenght)
        || (maxLength && element.value.trim().lenght < maxLength)
        || (regex && !element.value.toLowerCase().match(regex))
        ) {
        closest.addClass('error');
        return false;
    }
    return closest.removeClass('error');
    return true;
}

function validarFormularioUm(){
    if (nomeValido && sobrenomeValido && emailValido && dataNascimentoValido){
        $containerBtnFormOne.removeClass('disabled');
        $btnFormOne.removeClass('disabled');
        $btnFormOne.off('click').on('click', inciarFormulario2)
    }else{
        $containerBtnFormOne.addClass('disabled');
        $btnFormOne.addClass('disabled');
        $btnFormOne.off('click')
    }
}

function inciarFormulario2(){
    $stepText.text('Passo 2 de 3 - Dados de correspondência');
    $stepDescription.text('Precisamos desses dados para que possamos entrar em contato caso necessário.');
    $stepOne.hide();
    $stepTwo.show();

    $inputEndereco.keyup(function(){
        enderecoValido = validarInput(this, minLenghtTextArea);
        validarFormularioDois();
    });

    $inputCidade.keyup(function(){
        cidadeValido = validarInput(this, minLenghtText);
        validarFormularioDois();
    });

    $inputCep.keyup(function(){
        this.value = this.value.replace(/\D/g,'');
        cepValido = validarInput(this, null, null, cepRegex);
        if(cepValido){
            this.value = this.value.replace(cepRegex, "$1.$2-$3")
        }
        validarFormularioDois();
    });

    $inputComplemento.keyup(function(){
        validarFormularioDois();
    });
}

function validarFormularioDois(){
    if(enderecoValido && cidadeValido && cepValido){
        $containerBtnFormTwo.removeClass('disabled');
        $btnFormTwo.removeClass('disabled');
        $btnFormTwo.off('click').on('click', inciarFormulario3);
    }else{
        $containerBtnFormTwo.addClass('disabled');
        $btnFormTwo.addClass('disabled');
        $btnFormTwo.off('click');
    }
}

function inciarFormulario3(){
    $stepText.text('Passo 3 de 3 - Fale sobre você');
    $stepDescription.text('Para que possamos filtrar você melhor, no processo, conte-nos um pouco mais sobre sua habilidades e pontos positivos.');
    $stepTwo.hide();
    $stepThree.show();

    $inputHabilidades.keyup(function(){
        habilidadesValido = validarInput(this, minLenghtTextArea);
        validarFormularioTres();
    });

    $inputPontosForte.keyup(function(){
        pontosForteValido = validarInput(this, minLenghtTextArea);
        validarFormularioTres();
    });
}

function validarFormularioTres(){
    if (habilidadesValido && pontosForteValido){
        $containerBtnFormThree.removeClass('disabled');
        $btnFormThree.removeClass('disabled');
    }else{
        $containerBtnFormThree.addClass('disabled');
        $btnFormThree.addClass('disabled');
    }
}

function init(){
    $stepText.text('Passo 1 de 3 - Dados Pessoais');
    $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor.');
    $stepTwo.hide();
    $stepThree.hide();

    $inputNome.keyup(function(){
       nomeValido = validarInput(this, minLenghtText);
       validarFormularioUm();
    });

    $inputSobrenome.keyup(function(){
        sobrenomeValido = validarInput(this, minLenghtText);
        validarFormularioUm();
    });

    $inputDataNascimento.keyup(function(){
        dataNascimentoValido = validarInput(this, minLenghtText);
        validarFormularioUm();
    });

    $inputDataNascimento.change(function(){
        dataNascimentoValido = validarInput(this, minLenghtText);
        validarFormularioUm();
    });

    $inputEmail.keyup(function(){
        emailValido = validarInput(this, null, null, emailRegex);
        validarFormularioUm();
    });

    $inputMinibio.keyup(function(){
        validarFormularioUm();
    });

    $inputDataNascimento.on('focus', function(){
        this.type = 'date';
    });

    $inputDataNascimento.on('blur', function(){
        if (!this.value){
            this.type = 'text';
        }
    })
}

init();