
// Banner & button creation
let body = document.querySelector("body");

function createEditModeBanner() {

    // Black banner on the top
    let bannerEdit = document.createElement("div");
    let spanEdit = document.createElement("span");
    let iconEdit = document.createElement("i");

    iconEdit.classList.add("fa-regular", "fa-pen-to-square");
    iconEdit.style.color = "white";
    spanEdit.innerText = "Mode Edition";
    spanEdit.style.color = "white";
    bannerEdit.appendChild(iconEdit);
    bannerEdit.appendChild(spanEdit);
    bannerEdit.classList.add("banner-edit");
    body.insertBefore(bannerEdit, body.firstChild);


    // Button to edit projects
    let divPortfolio = document.getElementById("portfolio");
    let titrePortfolio = document.querySelector("#portfolio h2");
    let divTitre = document.createElement("div");
    let modalLink = document.createElement("a");
    let iconPortfolio = document.createElement("i");
    let spanPortfolio = document.createElement("span");

    iconPortfolio.classList.add("fa-regular", "fa-pen-to-square");
    iconPortfolio.style.color = "black";
    iconPortfolio.style.margin = "0 0 2em 1em";
    modalLink.appendChild(iconPortfolio);
    modalLink.href = 'modal';
    modalLink.classList.add('btnModale');
    modalLink.classList.add('modal-trigger');
    spanPortfolio.innerText = "modifier";
    spanPortfolio.style.marginBottom = "2em";
    divTitre.appendChild(titrePortfolio);
    divTitre.appendChild(modalLink);
    divTitre.appendChild(spanPortfolio);
    divTitre.classList.add("div__title");
    divPortfolio.insertBefore(divTitre, divPortfolio.firstChild);

    // Icon mousehover to change cursor
    iconPortfolio.addEventListener("mouseover", () => {
        iconPortfolio.style.cursor = "pointer";
    });
}


//Remlpacement Login -> Logout, Logout -> Login
let headerNav = document.querySelector("header nav ul");
let linkLogin = document.querySelector("header nav ul a");

if(window.localStorage.getItem("userToken") != null) {

    createEditModeBanner();

    let linkLogout = document.createElement("a");
    linkLogout.setAttribute('href', "index.html");
    let liLogout = document.createElement("li");
    liLogout.innerText = "logout";
    linkLogout.appendChild(liLogout);
    headerNav.replaceChild(linkLogout, linkLogin);
    
    linkLogout.addEventListener("click", function() {
        window.localStorage.removeItem("userToken");
    });
}


// Récupération des catégories depuis l'API
const categoriesResponse = await fetch('http://localhost:5678/api/categories');
const categories = await categoriesResponse.json();

const inputSelect = document.querySelector("#modal2 select");
for (let i = 0; i < categories.length; i++) {
    let option = document.createElement("option");
    option.value = categories[i].name;
    option.textContent = categories[i].name;
    inputSelect.appendChild(option);
}



const modal1 = document.getElementById('modal1');
const modal2 = document. getElementById('modal2');
const modTriggers1 = document.querySelectorAll(".modal-trigger");
modTriggers1.forEach(trigger => trigger.addEventListener("click", toggleModal1));
const modTriggers2 = document.querySelectorAll(".modal-trigger2");
modTriggers2.forEach(trigger => trigger.addEventListener("click", toggleModal2));

function toggleModal1(e) {
    e.preventDefault();
    modal1.classList.toggle("active");
}

function toggleModal2(e) {
    e.preventDefault();
    modal2.classList.toggle("active");
}


// Gestion de l'affichage de l'image uploadée dans le formulaire d'ajout
const photoUpload = document.getElementById("photoUpload");
photoUpload.addEventListener('change', previewFile);

function previewFile() {
    const file = this.files[0]
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', (event) => displayPhoto(event, file));
}

function displayPhoto(event, file) {
    const photo = document.querySelector("#modal2 img");
    const input = document.querySelector("#modal2 figure input");
    photo.src = event.target.result;
    photo.classList.add("imgUpload");
    input.style.display = "none";
}



const projectsResponse = await fetch('http://localhost:5678/api/works');
const projects =  await projectsResponse.json();

const modGallery = document.querySelector(".modal__gallery");
// Affichage des projets dans la gallerie du modal
for (let i = 0; i < projects.length; i++) {
    
    let divPhoto = document.createElement("div");
    let img = document.createElement("img");
    let btnSuppr = document.createElement("button");
    let btnIcon = document.createElement("i");

    img.src = projects[i].imageUrl;
    img.alt = projects[i].title;

    btnIcon.classList.add("fa-regular", "fa-trash-can");
    btnSuppr.appendChild(btnIcon);

    divPhoto.classList.add("modal-card");

    divPhoto.appendChild(btnSuppr);
    divPhoto.appendChild(img);
    modGallery.appendChild(divPhoto);
}


// Click pour aller au deuxième modal via le bouton du premier
const btnAjout = document.querySelector(".modal__content input");
btnAjout.addEventListener("click", function(e) {
    toggleModal1(e);
    toggleModal2(e);
    
});


const formAjoutPhoto = document.getElementById("formAjoutPhoto");

function restForm() {
    formAjoutPhoto.reset();
    const photo = document.querySelector("#modal2 img");
    const input = document.querySelector("#modal2 figure input");
    photo.src = "";
    photo.classList.remove("imgUpload");
    input.style.display = "block";

}

// Click pour revenir au premier modal depuis le deuxième
const iconRetour = document.querySelector("#modal2 i");
iconRetour.addEventListener("click", function(e) {
    toggleModal2(e);
    toggleModal1(e);
    restForm();
});