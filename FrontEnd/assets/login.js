
function mailVerification(mail) {
    var regexMail = new RegExp('^[a-z0-9-.]+@[a-z0-9-.]+\.[a-z]+$');
    return regexMail.test(mail);
}; 


const formLogin = document.getElementById("formLogin");
formLogin.addEventListener('submit', function(log){
    let userMail = document.getElementById("email");
    let userPassword = document.getElementById("password");
    let error = document.getElementById("error");
    error.style.color = "red";

    if ((userMail.value == "") || (userPassword.value == "")){
        error.innerHTML = "L'un des champs est vide !!!";
        log.preventDefault();
    }
    else {
        if (mailVerification(userMail.value) != true) {
            error.innerHTML = "L'adresse mail n'est pas valide.";
            log.preventDefault();
        }
        else {
            /*const userAuth = {
                email : userMail.value,
                password : userPassword.value
            }
            const chargeUserAuth = JSON.stringify(userAuth);

            fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUserAuth
            });*/
            
            console.log("Log possible");
            log.preventDefault();
        }
    }
});