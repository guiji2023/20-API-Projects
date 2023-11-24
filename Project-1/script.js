const form = document.querySelector('form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password1 = document.querySelector('#password1');
const password2 = document.querySelector('#password2');



const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};


const showSuccess =(input)=>{
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

const checkEmail = (input) => {
    const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value)){
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
};

const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

const checkRequired = (inputArr)=>{
    inputArr.forEach(input => {
        if(!input.value){
            showError(input, `${getFieldName(input)} is required`)
        } else{
            showSuccess(input);
        }
    });
}


const checklength = (input, min, max) => {
    if (input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }

}


const checkPasswordsMarch = (input1, input2)=>{
    if(input1.value !== input2.value){
        showError(input2, `Passwords do not match`)
    }
}

form.addEventListener('submit', e=>{
    e.preventDefault();
    checkRequired([username, email, password1, password2]);
    checklength(username, 5, 15);
    checklength(password1, 10, 25);
    checklength(password2, 10, 25);
    checkEmail(email);
    checkPasswordsMarch(password1, password2);
});