/***   Gestion de la connexion de l'utilisateur à l'API   ***/
document.getElementById("formLogin").addEventListener('submit', async function(log){
    log.preventDefault();
    let error = document.getElementById("error");
    error.style.color = "red";

    try {
        const userAuth = {
            email : log.target.email.value,
            password : log.target.password.value
        }
        const chargeUserAuth = JSON.stringify(userAuth);

        const fetchResponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUserAuth
        });

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
        window.localStorage.setItem("userToken", responseToken.token);
        window.location.href = "index.html";

    } catch (err) {        
        console.error(err);
    }
});