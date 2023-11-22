const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');

const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputDataNascimento = $('#dataNascimento');

function init(){
    $stepText.text('Passo 1 de 3 - Dados Pessoais');
    $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor.');
    $stepTwo.hide();
    $stepThree.hide();

    $inputNome.keyup(function(){
        const closest = $(this).closest('.input-data');
        if (!this.value || this.value.trim().lenght > 2) {
            return closest.addClass('error');
        }
        return closest.removeClass('error');
    });

    $inputSobrenome.keyup(function(){
        const closest = $(this).closest('.input-data');
        if (!this.value || this.value.trim().lenght < 2) {
            return closest.addClass('error');
        }
        return closest.removeClass('error');
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