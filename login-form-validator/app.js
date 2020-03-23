let username = document.getElementById('username');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');
let nameF = document.getElementById('nameF');
let nameL = document.getElementById('nameL');
let login = document.getElementById('login');
let errLog = [];

const showErr=(input, msg)=>{
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = msg
}
const showSuccess = (input)=>{
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const validateEmail = (username)=> {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(username.value)){
        showSuccess(username)
    }else{
        showErr(username, `Email is invalid!`)
        errLog.push(1);
    }
}

const checkForm = (arr)=>{
    arr.forEach((e,i,arr)=>{ 
        if(e.value === ''){
            showErr(e, `${e.dataset.input} input is required!`)
            errLog.push(1)
        }else{
            showSuccess(e)
        }
    })
}

const checkLength = (input ,min ,max)=>{
    if(input.value.length < min){
        showErr(input, ` Must be at least ${min} in length`)
        errLog.push(1)
    }else if(input.value.length > max){
        showErr(input, ` Must be at less than ${max} length`)
        errLog.push(1)
    }else{
        showSuccess(input)
    }
}

const matchPasswords = (pass1,pass2) => {
    if(pass1.value !== pass2.value){
        showErr(pass2, 'Passwords do not match')
        errLog.push(1);
    }
}

const clearForm = async ()=>{
    errLog = [];
    let x = document.getElementsByTagName('input');
    x = Array.from(x);
    x.map( e => e.value = '');
}
const sendPayload = (payloadArr)=>{
    let payload = [
        payloadArr[0].value.trim().toLowerCase(),
        payloadArr[1].value.trim().toLowerCase(),
        payloadArr[2].value.trim().toLowerCase(),
        payloadArr[3].value.trim().toLowerCase()
    ]
    // send fetch request here....
    console.log('SHIP IT!!!', payload);
}

login.addEventListener('submit', function(e){
    e.preventDefault();
    errLog = []
    validationArr = [username,password,password2,nameF,nameL];
    checkForm(validationArr);
    checkLength(username,6,30)
    checkLength(password,6,25)
    validateEmail(username)
    matchPasswords(password,password2)
    if( errLog.length  === 0 ){
        payloadArr = [username,password,nameF,nameL];
        sendPayload(payloadArr);
    }else{
        console.log(' its a no go! ');
    }
})