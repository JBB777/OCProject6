
function champVide(message) {
    this.message = message;
    this.name = "Attention : ";
}


const formLogin = document.getElementById("formLogin");
formLogin.addEventListener('submit', async function(log){
    log.preventDefault();

    let userMail = document.getElementById("email");
    let userPassword = document.getElementById("password");
    let error = document.getElementById("error");
    error.style.color = "red";

    // if ((userMail.value == "") || (userPassword.value == "")){
    //     error.innerHTML = "L'un des champs est vide !!!";
    // }
    // else { 
    //     const userAuth = {
    //         email : userMail.value,
    //         password : userPassword.value
    //     }
    //     const chargeUserAuth = JSON.stringify(userAuth);

    //     const fetchResponse = await fetch("http://localhost:5678/api/users/login", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: chargeUserAuth
    //     });
        
    //     if (fetchResponse.status == 200) {
    //         const responseToken = await fetchResponse.json();
    //         window.localStorage.setItem("userToken", responseToken.token);
    //         window.location.href = "index.html";
    //     }
    //     else {
    //         if (fetchResponse.status == 401) {
    //             error.innerHTML = "Mot de passe incorrect";
    //         }
    //         if (fetchResponse.status == 404) {
    //             error.innerHTML = "Utilisateur non trouvé";
    //         }
    //     }
    // }

    try {
        const userAuth = {
            email : userMail.value,
            password : userPassword.value
        }
        const chargeUserAuth = JSON.stringify(userAuth);

        const fetchResponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUserAuth
        });

        if (userMail.value == "") {
            error.innerHTML = "Saisissez votre @ mail !!";
            throw new champVide("Saisissez votre @ mail !!");
        }
        if (userPassword.value == "") {
            error.innerHTML = "Saisissez votre mdp !!";
            throw new champVide("Saisissez votre mdp !!");
        }
        if (fetchResponse.status == 401) {
            error.innerHTML = "Mot de passe incorrect";
            throw new Error("MdP incorrect");
        }
        if (fetchResponse.status == 404) {
            error.innerHTML = "Utilisateur non trouvé";
            throw new Error("User not found");
        }
        
        console.log("Login possible pour Sophie");
        const responseToken = await fetchResponse.json();
        //window.localStorage.setItem("userToken", responseToken.token);
        //window.location.href = "index.html";

    } catch (err) {        
        console.log(err);
    }
});