

let validator = {
    handleSubmit:(event)=>{
        event.preventDefault();        
        let send = true;
        let inputs = form.querySelectorAll('input');
        
        validator.limparErros();

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);
            if (check !== true) {
                send = false;
                validator.mostrarErro(input, check);
            }
        }
        
        if (send) {
            form.submit();
            
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');
            for(let i in rules){
                let rDet = rules[i].split('=');
                switch(rDet[0]) {
                    case 'required' : 
                        if(input.value == ''){
                            return 'Campo vazio!'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDet[1]){
                            return 'Campo tem que ter pelo menos '+rDet[1]+' caracteres';
                        }
                    break;
                    case 'email':
                        if(input .value != ''){
                            let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!reg.test(input.value.toLowerCase())){
                                return 'Email não válido!'
                            }
                        }
                    break;
                    case 'confEmail':
                        let email = form.email.value;
                        let confirEmail
                    break;
                }
            }
        }
        return true;
        },
        mostrarErro: (input, error)=>{
        input.style.borderColor = '#FF0000';

        let erro = document.createElement('div');
        erro.classList.add('error');
        erro.innerHTML = error;

        input.parentElement.insertBefore(erro, input.ElmentSibling);

    },
    limparErros: ()=>{

        let erroInput = document.querySelectorAll('input');
        for(let i = 0; i<erroInput.length; i++){
            erroInput[i].style = '';
        }

        let erro = document.querySelectorAll('.error');
        for(let i=0;i<erro.length;i++){
            erro[i].remove();
        }
    }

};
let form = document.querySelector('.bvalidator');
form.addEventListener('submit', validator.handleSubmit);