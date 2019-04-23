// consts
const serverURL = "http://localhost:8080/";

// elements
var signUpForm = document.querySelector('.sign-up-form');
var signInForm = document.querySelector('.sign-in-form');

var signUpSwitch = document.querySelector('.sign-up-switch');
var signInSwitch = document.querySelector('.sign-in-switch');

var signUpBtn = document.querySelector('.sign-up-btn');
var signInBtn = document.querySelector('.sign-in-btn');

// events
signInSwitch.addEventListener('click', switchToSignIn);
signUpSwitch.addEventListener('click', switchToSignUp);

signUpBtn.addEventListener('click', signUp);
signInBtn.addEventListener('click', signIn);

// aux
function cout(message) {
    console.log(message);
}

// sign up / in switching
function switchToSignIn(event) {
    signUpForm.classList.add('hidden');
    signInForm.classList.remove('hidden');
    cout("switched to sign in!");
}
function switchToSignUp(event) {
    signInForm.classList.add('hidden');
    signUpForm.classList.remove('hidden');
    cout("switched to sign up!");
}

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
    
    cout(headers);

    axios.get(serverURL + subPath, { "headers": headers })
            .then(response => succHandler(response))
            .catch(e => errHandler(e));
}

// sign up / in
function signUp() {
    cout("signing up...");
}

function printError(message) {
    cout("error:");
    cout(message);
}
function openUserAccount(response) {
    let token = response.data.token;
    cout("token:");
    cout(token);
    localStorage.setItem("userToken", token);
    window.location.href = "user_index.html";
}
function signIn() {
    let username = document.querySelector('.sign-in-form .username').value;
    let password = document.querySelector('.sign-in-form .password').value;
    let user = { "username" : username, "password": password };
    
    cout("signing in...");
    cout(user)

    makePost("auth/login", user, openUserAccount, printError)
}










/*var xmlHttp = new XMLHttpRequest(); 
    xmlHttp.open("POST", "http://localhost:8080/auth/login", false);
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send(JSON.stringify(user));*/