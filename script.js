// elements reference
let registerFormContainer = document.getElementById("register-form-container");
let loginFormContainer = document.getElementById("login-form-container");
let gameContainer = document.getElementById("game-container");
let goToLogin = document.querySelector(".link-to-sign-in");
let goToRegister = document.querySelector(".link-to-register");
// Router for application

goToLogin.addEventListener("click", ()=>{
    router("login");
})
goToRegister.addEventListener("click", ()=>{
    router("register");
})
function setUpState(){
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let users = JSON.parse(localStorage.getItem("users"));
    if(!users){
        localStorage.setItem("users", JSON.stringify([]));
    }
    if(!loggedInUser){
        localStorage.setItem("loggedInUser", null);
        router("register")
    }else{
        router("game");
    }
}
setUpState();

function router(routTo){ // input is string telling us which page to route to
    if(routTo === "register"){
        registerFormContainer.classList.remove("hidden");
        loginFormContainer.classList.add("hidden");
        gameContainer.classList.add("hidden");
    }else if(routTo === "login"){
        loginFormContainer.classList.remove("hidden");
        registerFormContainer.classList.add("hidden");
        gameContainer.classList.add("hidden");        
    }else{
        gameContainer.classList.remove("hidden");
        loginFormContainer.classList.add("hidden");
        registerFormContainer.classList.add("hidden");
        
    }
}



function store(){
    let name = document.getElementById('name');
    let pw = document.getElementById('pw');
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;

    if(name.value.length == 0){
        alert('Please fill in email');

    }else if(pw.value.length == 0){
        alert('Please fill in password');

    }else if(name.value.length == 0 && pw.value.length == 0){
        alert('Please fill in email and password');

    }else if(pw.value.length < 8){
        alert('Max of 8');

    }else if(!pw.value.match(numbers)){
        alert('please add 1 number');

    }else if(!pw.value.match(upperCaseLetters)){
        alert('please add 1 uppercase letter');

    }else if(!pw.value.match(lowerCaseLetters)){
        alert('please add 1 lovercase letter');

    }else{
        // localStorage.setItem('name', name.value);
        // localStorage.setItem('pw', pw.value);
        let users = JSON.parse(localStorage.getItem("users"));
        users.push({
            userName : name.value,
            password : pw.value,
            pastScores : []
        })
        localStorage.setItem("users", JSON.stringify(users));
        alert('Your account has been created please click on proceed to login');
    }
}

document.getElementById("form-login").addEventListener("click", (e)=>{
    e.preventDefault();
});
//checking
function check(){
    let users = JSON.parse(localStorage.getItem("users"));
    let typedUserName = document.getElementById('userName').value.trim();
    let typedPassword= document.getElementById('userPw').value.trim()

    let user = users.find((user)=>{
        console.log(user.userName , typedUserName, user.password, typedPassword);
        return user.userName === typedUserName && user.password === typedPassword;
    })

    if(user){
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        router("game");
    }else{
        alert('Wrong username or password');
    }
}


let score = 0;
let cross = true;
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 1000);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 800);

    }

}, 10);


function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
    setPastScore(score);
}

function setPastScore(latestScore){
    let users = JSON.parse(localStorage.getItem("users"));
    let newUserData = users.map((user)=>{
        if(user.userName === JSON.parse(localStorage.getItem("loggedInUser")).userName){
            user.pastScores.push(score);
            localStorage.setItem("loggedInUser", JSON.stringify(user));
        }
        return user;
    })
    localStorage.setItem("users", JSON.stringify(newUserData));
}
