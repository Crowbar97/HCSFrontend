//-share------------------------------------------------------------------------------
// consts
const serverURL = "http://localhost:8080/";
// proxy functions
function makePost(subPath, body, succHandler, errHandler, token = null) {
    let headers = {
        'Content-Type': 'application/json'
    };

    if (token)
        headers.Authorization = "Bearer " + token;

    axios.post(serverURL + subPath, body, { "headers": headers })
            .then(response => succHandler(response))
            .catch(e => errHandler(e));
}
function makeGet(subPath, succHandler, errHandler, token = null) {
    let headers = {
        'Content-Type': 'application/json'
    };

    if (token)
        headers.Authorization = "Bearer " + token;

    axios.get(serverURL + subPath, { "headers": headers })
            .then(response => succHandler(response))
            .catch(e => errHandler(e));
}
// aux
function cout(message) {
    console.log(message);
}
//------------------------------------------------------------------------------------

// elements
var signUpForm = document.querySelector('.sign-up-form');
var signInForm = document.querySelector('.sign-in-form');

var signUpSwitch = document.querySelector('.sign-up-switch');
var signInSwitch = document.querySelector('.sign-in-switch');

var signUpBtn = document.querySelector('.sign-up-btn');
var signInBtn = document.querySelector('.sign-in-btn');

// events
document.addEventListener("DOMContentLoaded", tryToSignIn);

signInSwitch.addEventListener('click', switchToSignIn);
signUpSwitch.addEventListener('click', switchToSignUp);

signUpBtn.addEventListener('click', signUp);
signInBtn.addEventListener('click', signIn);

// auto signing in
function tryToSignIn() {
    if (localStorage.hasOwnProperty("userToken")) {
        cout("Found user token!");
        window.location.href = "user_index.html";
    }
    else
        cout("User token was not found!");
}

// sign up / in switching
function switchToSignIn() {
    signUpForm.classList.add('hidden');
    signInForm.classList.remove('hidden');
    cout("switched to sign in!");
}
function switchToSignUp() {
    signInForm.classList.add('hidden');
    signUpForm.classList.remove('hidden');
    cout("switched to sign up!");
}


// sign up / in
function printError(message) {
    cout("error:");
    cout(message);
}
function signUp() {
    cout("signing up...");

    let user = {
        "username" : document.querySelector('.sign-up-form .username').value,
        "password": document.querySelector('.sign-up-form .password').value,
        "email": document.querySelector('.sign-up-form .email').value,
        "lastName": document.querySelector('.sign-up-form .lastName').value,
        "firstName": document.querySelector('.sign-up-form .firstName').value,
        "middleName": document.querySelector('.sign-up-form .middleName').value,
        "apartment": document.querySelector('.sign-up-form .apartment').value,
        "phoneNumber": document.querySelector('.sign-up-form .phoneNumber').value
    };

    cout(user);

    makePost("auth/register", user, signIn, printError)
}

function openUserAccount(response) {
    let token = response.data.token;
    localStorage.setItem("userToken", token);
    cout("User token was saved!");
    window.location.href = "user_index.html";
}
function signIn() {
    // switchToSignUp()
    // switchToSignIn()

    cout("signing in...");

    let formSelector;
    if (signUpForm.classList.contains("hidden"))
        formSelector = '.sign-in-form';
    else
        formSelector = '.sign-up-form';

    let user = {
        "username": document.querySelector(formSelector + ' .username').value,
        "password": document.querySelector(formSelector + ' .password').value
    };
    
    cout(user)

    makePost("auth/login", user, openUserAccount, printError)
}
